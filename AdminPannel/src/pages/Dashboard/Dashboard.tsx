import React from "react";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import DashbordGraph from "../../components/DashbordGraph/DashbordGraph";
import DashboardSheudle from "../../components/DashboardSheudle/DashboardSheudle";
import DashboardProject from "../../components/DashboardProject/DashboardProject";

const Dashboard: React.FC = () => {
  return (
    <div>
      <DashboardCard />
      {/* <DashbordGraph />
      <DashboardSheudle />
      <DashboardProject /> */}
    </div>
  );
};

export default Dashboard;
