import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const HomePage = () => {
  return (
    <MainLayout>
        
            <div className="bg-light p-5 mt-4 rounded-3">
                <h1>Welcome to the POS System</h1>
                <p>If any Query/Problem Contact 222-3422-551</p>
                <Link to='/pos' className="btn btn-primary">POS Page</Link>
            </div>
        
    </MainLayout>
  );
};

export default HomePage;
