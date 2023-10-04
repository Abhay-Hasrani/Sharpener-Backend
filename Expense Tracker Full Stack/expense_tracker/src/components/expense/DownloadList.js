import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import myUrls from "../../utils/myUrls";
const DownloadList = () => {
  const [downloadsArr, setDownloadsArr] = useState([]);
  console.log(downloadsArr);
  useEffect(() => {
    async function refreshdownloadsList() {
      try {
        const downloadsObj = await axios.get(myUrls.allDownloadsExpenseUrl);
        if (downloadsObj.status === 201) {
          const downloadsObjList = downloadsObj.data;
          // console.log(allDownloads);
          setDownloadsArr(downloadsObjList);
        }
      } catch (err) {
        console.log("error while donloading expenses");
        console.log(err);
      }
    }
    refreshdownloadsList();
  }, []);

  const createDownloadLink = (fileUrl, createdAt) => {
    return (
      <a href={fileUrl} download={"Expenses.csv"}>
        {console.log(createdAt)}
        {new Date(createdAt).toDateString()}
      </a>
    );
  };

  const downloadsList = downloadsArr.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{createDownloadLink(item.fileUrl, item.createdAt)}</td>
    </tr>
  ));

  return (
    <>
      <div id="alldownloads-title" className="list-title">
        All Downloads
      </div>
      <Table variant="dark" hover size="sm" className="w-75 m-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>{downloadsList}</tbody>
      </Table>
    </>
  );
};
export default DownloadList;
