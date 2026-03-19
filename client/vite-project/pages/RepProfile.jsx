import React, { useEffect, useState } from "react";
import { BiError } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUser from "../src/context/UserContext";
import axios from "axios";

function RepProfile() {

  const { user, setUser } = useUser();

  const [resolvedIssues, setResolvedIssues] = useState([]);
  const [activeIssues, setActiveIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {

        const res = await axios.get(
          "https://civil-mon.vercel.app/api/v1/rep/profile",
          { withCredentials: true }
        );

        const rep = res.data.data.rep;

        setUser(rep);

        const issues = rep.issues || [];

        const resolved = issues.filter((issue) => issue.resolved === true);
        const active = issues.filter((issue) => issue.resolved === false);

        setResolvedIssues(resolved);
        setActiveIssues(active);

      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  const markResolved = async (id) => {
    try {

      await axios.patch(
        `https://civil-mon.vercel.app/api/v1/issues/resolve/${id}`,
        {},
        { withCredentials: true }
      );

      setActiveIssues((prev) => prev.filter((issue) => issue._id !== id));

      const issue = activeIssues.find((i) => i._id === id);
      issue.resolved = true;

      setResolvedIssues((prev) => [...prev, issue]);

    } catch (error) {
      console.log(error);
    }
  };

  const markInProgress = async (id) => {
    try {

      await axios.patch(
        "https://civil-mon.vercel.app/api/v1/issues/progress",
        { _id: id },
        { withCredentials: true }
      );

      setActiveIssues((prev) =>
        prev.map((issue) =>
          issue._id === id ? { ...issue, status: "in-progress" } : issue
        )
      );

    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-[1300px] mx-auto font-popp flex flex-col w-full pb-40 mt-5 px-4">

      {/* PROFILE */}
      <div className="flex flex-col w-full gap-3">

        <div className="bg-(--main-light) rounded-lg p-14 px-12 w-full">

          <div className="w-14 h-14 rounded-full bg-(--main-accent) flex justify-center items-center">
            <FaUser size={23} className="text-(--main-color)" />
          </div>

          <h2 className="font-bold text-lg mt-4">{user?.fullname}</h2>

          <p className="text-[0.8em] font-medium">
            State : {user?.state}
          </p>

          <p className="text-[0.8em] font-medium">
            District : {user?.district}
          </p>

          <p className="text-[0.8em] font-medium">
            Ward Number : {user?.wardnumber}
          </p>

        </div>

        {/* TRUST CARD */}
        <div className="bg-(--main-light) rounded-lg p-7 px-12 w-full">

          <div className="w-14 h-14 rounded-full bg-(--main-accent) flex justify-center items-center">
            <BiError size={28} className="text-(--main-color)" />
          </div>

          <h2 className="font-bold text-lg mt-4">
            Public Trust Score : 0
          </h2>

          <p className="text-[0.8em] font-medium">
            {resolvedIssues.length} resolved reports
          </p>

        </div>

      </div>

      {/* ACTIVE ISSUES */}

      <div className="mt-6">

        <h2 className="font-semibold text-lg">Active Issues</h2>

        {activeIssues.length === 0 ? (
          <p className="text-center mt-3">No Active Issues</p>
        ) : (
          activeIssues.map((issue) => (

            <div
              key={issue._id}
              className="border rounded-xl p-5 mt-4 shadow-sm bg-white flex flex-col gap-2"
            >

              <div className="flex justify-between items-center">

                <h3 className="font-semibold text-lg">
                  {issue.issueType}
                </h3>

                <span className="text-xs px-3 py-1 rounded-full bg-yellow-200">
                  {issue.status === "in-progress" ? "In Progress" : "Active"}
                </span>

              </div>

              <p className="text-sm text-gray-600">
                {issue.description}
              </p>

              <p className="text-xs text-gray-500">
                Severity: {issue.severity}
              </p>

              <div className="flex gap-3 mt-3">

                <button
                  onClick={() => markInProgress(issue._id)}
                  className="px-4 py-1 rounded bg-blue-500 text-white text-sm hover:cursor-pointer"
                >
                  Mark In Progress
                </button>

                <button
                  onClick={() => markResolved(issue._id)}
                  className="px-4 py-1 rounded bg-green-600 text-white text-sm hover:cursor-pointer"
                >
                  Mark Resolved
                </button>

              </div>

            </div>

          ))
        )}

      </div>

      {/* RESOLVED ISSUES */}

      <div className="mt-8">

        <h2 className="font-semibold text-lg">Resolved Issues</h2>

        {resolvedIssues.length === 0 ? (
          <p className="text-center mt-3">No Resolved Issues</p>
        ) : (
          resolvedIssues.map((issue) => (

            <div
              key={issue._id}
              className="border rounded-xl p-5 mt-4 shadow-sm bg-green-50 flex flex-col gap-2"
            >

              <div className="flex justify-between items-center">

                <h3 className="font-semibold text-lg">
                  {issue.issueType}
                </h3>

                <span className="text-xs px-3 py-1 rounded-full bg-green-300">
                  Resolved
                </span>

              </div>

              <p className="text-sm text-gray-600">
                {issue.description}
              </p>

              <p className="text-xs text-gray-500">
                Severity: {issue.severity}
              </p>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default RepProfile;