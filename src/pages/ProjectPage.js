import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    description: "",
    deadline: "",
    budget: "",
    files: "",
    owner: "",
    date: "",
  });

  const fetchProject = async () => {
    const res = await axios({
      url: `http://localhost/project/getprojectsByOwner/${id}`,
      method: "get",
    });
    setData(res.data);
  };

  useEffect(() => {
    fetchProject();
  }, []);
  return (
    <div>
      <h1> </h1>
    </div>
  );
};

export default ProjectPage;
