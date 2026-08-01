import React, { useEffect, useState } from "react";
import "./TestimonialPreview.css";
import { Star } from "lucide-react";
import API, { getImageUrl } from "../../api/api";

/* ================= TYPES ================= */

interface Testimonial {
  _id: string;
  name: string;
  designation?: string;
  rating: number;
  message: string;
  image?: string;
  published?: boolean;
}

/* ================= COMPONENT ================= */

const TestimonialPreview: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH TESTIMONIALS ================= */

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await API.get("/testimonials");

        console.log("API RESPONSE:", res.data);

        // Safe access
        const allTestimonials: Testimonial[] = res?.data?.data || [];

        console.log("ALL TESTIMONIALS:", allTestimonials);

        // Filter only published testimonials
        const publishedTestimonials = allTestimonials.filter(
          (item) => item.published === true
        );

        console.log("PUBLISHED TESTIMONIALS:", publishedTestimonials);

        setTestimonials(publishedTestimonials);
      } catch (error) {
        console.error("FETCH TESTIMONIAL ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  /* ================= UI ================= */

  return (
    <div className="testimonial-preview-container">
      <h2 className="testimonial-preview-title">
        🌟 Client Testimonials
      </h2>

      {loading ? (
        <p className="testimonial-loading">
          Loading testimonials...
        </p>
      ) : testimonials.length === 0 ? (
        <p className="testimonial-empty">
          No testimonials available
        </p>
      ) : (
        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <div key={t._id} className="testimonial-card">

              {/* PROFILE */}
              <div className="testimonial-header">
                <img
                  src={
                    t.image
                      ? getImageUrl(t.image)
                      : "/default-avatar.png"
                  }
                  alt={t.name}
                  className="testimonial-avatar"
                />

                <div>
                  <h3 className="testimonial-name">{t.name}</h3>

                  {t.designation && (
                    <p className="testimonial-designation">
                      {t.designation}
                    </p>
                  )}

                  {/* STAR RATING */}
                  <div className="testimonial-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        color={star <= t.rating ? "#facc15" : "#cbd5e1"}
                        fill={star <= t.rating ? "#facc15" : "none"}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* MESSAGE */}
              <p className="testimonial-message">
                “{t.message}”
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialPreview;