// import { Row, Col, Table, Button } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
// import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
// import { useEffect } from "react";
// import { useThunk } from "../../hooks/use-thunk";
// import { fetchUsers } from "../../redux/store";
// import { useSelector } from "react-redux";

// const deleteHandler = () => {
//     if(window.confirm("Are you sure?")) alert("User deleted!");
// }

// const AdminUsersPage = () => {
// const [users] = useThunk(fetchUsers)
// const userData = useSelector((state)=>state.users.usersData.data)
// console.log(("userData",userData));
//   useEffect(()=>{
//     users()
//   },[])

//   return (
//     <Row className="m-5">
//         <Col md={2}>
//         <AdminLinksComponent />
//         </Col>
//       <Col md={10}>
//         <h1>User List</h1>
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Is Admin</th>
//               <th>Edit/Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map(
//               (item, idx) => (
//                 <tr key={idx}>
//                   <td>{idx +1}</td>
//                   <td>Mark</td>
//                   <td>Twain</td>
//                   <td>email@email.com</td>
//                   <td>
//                     <i className={item}></i>
//                   </td>
//                   <td>
//                     <LinkContainer to="/admin/edit-user">
//                         <Button className="btn-sm">
//                             <i className="bi bi-pencil-square"></i>
//                         </Button>
//                     </LinkContainer>
//                     {" / "}
//                     <Button variant="danger" className="btn-sm" onClick={deleteHandler}>
//                         <i className="bi bi-x-circle"></i>
//                     </Button>
//                   </td>
//                 </tr>
//               )
//             )}
//           </tbody>
//         </Table>
//       </Col>
//     </Row>
//   );
// };

// export default AdminUsersPage;

import { Row, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useThunk } from "../../hooks/use-thunk";
import { fetchAdminProduct } from "../../redux/store";
import { useSelector } from "react-redux";
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../utils/Loader";
import {
  deleteProduct,
  fetchUsers,
  removeUser,
} from "../../redux/store/thunks/apiThunk";
import { StyledEngineProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import SimpleDialog from "./model/DeleteModel";
import { useLocation, useNavigate } from "react-router-dom";

function createData(fisrtName, lastName, email, isAdmin, id) {
  return {
    fisrtName,
    lastName,
    email,
    isAdmin,
    id,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: "fisrtName",
    numeric: false,
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: true,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "isAdmin",
    numeric: true,
    disablePadding: false,
    label: "Is Admin",
    isAdmin: true,
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        {headCells?.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const [delUser, delUserLoading, delUserErr, delUserSuccess, errDelUSerFalg] =
    useThunk(removeUser);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(0);
  const [delUserFlag, setDelUserFlag] = React.useState(true);

  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { selected, users, resetSelected } = props;
  const handleDelete = () => {
    setOpen(true);
    setDelUserFlag(true);
  };

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selected?.length > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {
          <SimpleDialog
            delUserFlag={delUserFlag}
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            delUser={delUser}
            users={users}
            resetSelected={resetSelected}
            selected={selected}
            delUserErr={delUserErr}
            delUserSuccess={delUserSuccess}
            errDelUSerFalg={errDelUSerFalg}
          />
        }
        {selected?.length > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected?.length} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Users
          </Typography>
        )}

        {selected?.length > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon onClick={handleDelete} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function AdminUsersPage() {
  const [users, userLoading] = useThunk(fetchUsers);
  const userData = useSelector((state) => state.users.usersData.data);
  console.log(("userData", userData));
  useEffect(() => {
    users();
  }, []);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("price");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [delProduct, delLoading, delErr, delSucess, delErrFlag] =
    useThunk(deleteProduct);
  const state = useLocation();

  //   let rows = []
  // productData?.map((item)=>{
  //     rows?.push(createData(item?.name,item.price,item.category,item.rating))
  //   })

  const rows = userData?.map((item) => {
    return createData(
      item?.name,
      item.lastName,
      item.email,
      item.isAdmin,
      item._id
    );
  });

  console.log("rows", rows);
  useEffect(() => {
    users();
  }, [state.pathname]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected?.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected?.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected?.slice(0, selectedIndex),
        selected?.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const resetSelected = () => {
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy))?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Row className="m-5">
      <Col md={2}>
        <StyledEngineProvider injectFirst>
          <AdminLinksComponent />
        </StyledEngineProvider>
      </Col>
      <Col md={10}>
        <h1>User List </h1>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar
              delErrFlag={delErrFlag}
              delSucess={delSucess}
              numSelected={selected.length}
              selected={selected}
              delProduct={delProduct}
              users={users}
              resetSelected={resetSelected}
            />
            <TableContainer>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {" "}
                {userLoading ? <Loader /> : null}
              </div>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={selected?.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows?.length}
                />

                <TableBody>
                  {visibleRows?.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            style={{ margin: "5px", padding: "5px" }}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row?.fisrtName}
                        </TableCell>
                        <TableCell align="right">{row?.lastName}</TableCell>
                        <TableCell align="right">{row?.email}</TableCell>
                        <TableCell align="right">{`${row?.isAdmin}`}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Col>
    </Row>
  );
}
