<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Management</title>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <style>
           body {
            font-family: 'Inter', sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }

        .header {
            background-color: #007bff;
            color: #fff;
            padding: 15px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .main {
            max-width: 900px;
            margin: 20px auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }

        table.dataTable {
            width: 100% !important;
            border-collapse: collapse;
        }

        table.dataTable thead th {
            background-color: #f4f4f4;
            color: #333;
            font-weight: 600;
        }

        table.dataTable tbody td {
            padding: 10px;
            color: #555;
        }

        table.dataTable tbody tr:hover {
            background-color: #f9f9f9;
        }

        table.dataTable tbody td button {
            border: none;
            padding: 5px 10px;
            margin: 2px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
        }

        .edit-btn {
            background-color: #28a745;
            color: #fff;
        }

        .edit-btn:hover {
            background-color: #218838;
        }

        .delete-btn {
            background-color: #dc3545;
            color: #fff;
        }

        .delete-btn:hover {
            background-color: #c82333;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 400px;
        }

        .modal-content h3 {
            margin-top: 0;
            margin-bottom: 15px;
        }

        .modal-content form div {
            margin-bottom: 15px;
        }

        .modal-content form label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 5px;
        }

        .modal-content form input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }

        .modal-content form button {
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin-right: 10px;
        }

        .update-btn {
            background-color: #007bff;
            color: white;
        }

        .update-btn:hover {
            background-color: #0056b3;
        }

        .cancel-btn {
            background-color: #ddd;
            color: #333;
        }

        .cancel-btn:hover {
            background-color: #bbb;
        }

        .add-btn {
            background-color: #17a2b8;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin-bottom: 20px;
        }

        .add-btn:hover {
            background-color: #138496;
        } 
    </style>
</head>

<body>
    <div class="header">
        <h1>User Management System</h1>
    </div>

    <div class="main">
        <button class="add-btn" onclick="openAddModal()">Add User</button>

        <table id="userTable" class="display">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>

    <!-- Edit Modal -->
    <div class="modal" id="editModal">
        <div class="modal-content">
            <h3>Edit User</h3>
            <form id="editUserForm">
                <input type="hidden" id="userId" name="id">
                <div>
                    <label>First Name</label>
                    <input type="text" id="editFirstName" name="ake_first_name" required>
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" id="editLastName" name="ake_last_name" required>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" id="editEmail" name="ake_email" required>
                </div>
                <div>
                    <label>Gender</label>
                    <input type="text" id="editGender" name="ake_gender" required>
                </div>
                <div>
                    <label>Address</label>
                    <input type="text" id="editAddress" name="ake_address" required>
                </div>
                <button type="submit" class="update-btn">Update</button>
                <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
            </form>
        </div>
    </div>

    <!-- Add Modal -->
    <div class="modal" id="addModal">
        <div class="modal-content">
            <h3>Add New User</h3>
            <form id="addUserForm">
                <div>
                    <label>First Name</label>
                    <input type="text" id="addFirstName" name="ake_first_name" required>
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" id="addLastName" name="ake_last_name" required>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" id="addEmail" name="ake_email" required>
                </div>
                <div>
                    <label>Gender</label>
                    <input type="text" id="addGender" name="ake_gender" required>
                </div>
                <div>
                    <label>Address</label>
                    <input type="text" id="addAddress" name="ake_address" required>
                </div>
                <button type="submit" class="update-btn">Add User</button>
                <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
            </form>
        </div>
    </div>

    <script>
        $(document).ready(function () {
            const userTable = $('#userTable').DataTable();

            function fetchUsers() {
                $.getJSON('/user/get_all', function (response) {
                    userTable.clear();
                    if (response.users && response.users.length > 0) {
                        response.users.forEach(user => {
                            userTable.row.add([
                                user.ake_first_name,
                                user.ake_last_name,
                                user.ake_email,
                                user.ake_gender,
                                user.ake_address,
                                ` 
                                    <button class="edit-btn" onclick="openEditModal(${user.id}, '${user.ake_first_name}', '${user.ake_last_name}', '${user.ake_email}', '${user.ake_gender}', '${user.ake_address}')">Edit</button>
                                    <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
                                `
                            ]).draw();
                        });
                    }
                });
            }

            fetchUsers();

            // Open edit modal
            window.openEditModal = function (id, firstName, lastName, email, gender, address) {
                $('#userId').val(id);
                $('#editFirstName').val(firstName);
                $('#editLastName').val(lastName);
                $('#editEmail').val(email);
                $('#editGender').val(gender);
                $('#editAddress').val(address);
                $('#editModal').show();
            };

            // Open add modal
            window.openAddModal = function () {
                $('#addModal').show();
            };

            // Close modal
            window.closeModal = function () {
                $('.modal').hide();
            };

            // Handle add user form submission
            $('#addUserForm').on('submit', function (e) {
                e.preventDefault();
                $.ajax({
                    url: '/user/create',
                    method: 'POST',
                    data: $(this).serialize(),
                    success: function () {
                        fetchUsers();
                        closeModal();
                    },
                    error: function () {
                        alert('Error adding user');
                    }
                });
            });

            // Handle edit user form submission
            $('#editUserForm').on('submit', function (e) {
                e.preventDefault();
                $.ajax({
                    url: `/user/update/${$('#userId').val()}`,  // Use the userId input value
                    method: 'POST',
                    data: $(this).serialize(),
                    success: function () {
                        fetchUsers();
                        closeModal();
                    },
                    error: function () {
                        alert('Error editing user');
                    }
                });
            });

            // Handle delete user
            window.deleteUser = function (id) {
    if (confirm('Are you sure you want to delete this user?')) {
        $.ajax({
            url: `/user/delete/${id}`,
            method: 'GET',
            success: function () {
                // Find the row in the DataTable and remove it
                const row = $(`#userTable tbody tr[data-id="${id}"]`);
                userTable.row(row).remove().draw();
            },
            error: function () {
                alert('Error deleting user');
            }
        });
    }
};

        });
    </script>
</body>

</html>
