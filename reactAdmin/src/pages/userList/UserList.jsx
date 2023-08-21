import React from "react";
import "./UserList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { useEffect } from "react";
import { deleteUser, getUsers } from "../../context/userContext/apiCalls";

const UserList = () => {
  const { users, dispatch } = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "user",
      headerName: "User",

      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row.profilePic ||
                "https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face-thumbnail.jpg"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },

    {
      field: "status",
      headerName: "Status",
      cellClassName: (params) => {
        return params.value === "Yes" ? "greenColor" : "redColor";
      },
      width: 120,
    },
    { field: "isAdmin", headerName: "IsAdmin", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/${params.row._id}`} state={{ user: params.row }}>
              <button className="userListEdit">Edit</button>
            </Link>

            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        columns={columns}
        disableSelectionOnClick
        checkboxSelection
        pagination // Enable pagination
        getRowId={(row) => row._id}
        pageSize={10} // Set the number of rows per page
        hideFooterPagination
      />
    </div>
  );
};

export default UserList;
