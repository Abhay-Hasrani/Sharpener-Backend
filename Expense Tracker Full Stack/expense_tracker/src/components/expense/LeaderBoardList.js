import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import myUrls from "../../utils/myUrls";
const LeaderBoardList = () => {
  const [leaderboardArr, setLeaderboardArr] = useState([]);

  useEffect(() => {
    async function refreshLeaderBoardList() {
      const leaderboardObj = await axios.get(myUrls.leaderboardUrl);
      const leaderBoardObjList = leaderboardObj.data;
      setLeaderboardArr(leaderBoardObjList);
    }
    refreshLeaderBoardList();
  }, []);

  const leaderBoardList = leaderboardArr.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.username}</td>
      <td>{item.totalExpense}</td>
    </tr>
  ));

  return (
    <>
      <div id="leaderboard-title" className="list-title">
        Leaderboard
      </div>
      <Table variant="dark" hover size="sm" className="w-75 m-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Total Expenses</th>
          </tr>
        </thead>
        <tbody>{leaderBoardList}</tbody>
      </Table>
    </>
  );
};
export default LeaderBoardList;
