<?php
defined('PREVENT_DIRECT_ACCESS') or exit('No direct script access allowed');

class User extends Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->call->model('User_model');
    }

    public function index()
    {
        $this->call->view('user_page');
    }
  
    public function create_user() { 
      header('Content-Type: application/json');
      
      try {
          if ($_SERVER['REQUEST_METHOD'] === 'POST') {
              $last_name = $this->io->post('ake_last_name');
              $first_name = $this->io->post('ake_first_name');
              $email = $this->io->post('ake_email');
              $gender = $this->io->post('ake_gender');
              $address = $this->io->post('ake_address');
  
              // Insert user into the database
              if ($this->User_model->insert_user($last_name, $first_name, $email, $gender, $address)) {
                  echo json_encode(['status' => 'success', 'message' => 'User created successfully.']);
              } else {
                  echo json_encode(['status' => 'error', 'message' => 'Failed to create user in the database.']);
              }
          } else {
              echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
          }
      } catch (Exception $e) {
          // Log the error
          log_message('error', $e->getMessage());
  
          echo json_encode(['status' => 'error', 'message' => 'An unexpected error occurred.']);
      }
  }
    public function get_all()
    {
        $users = $this->User_model->get_users();
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'users' => $users]);
    }

    public function update_user()
    {
        header('Content-Type: application/json');
        try {
            $id = $this->io->post('id');
            $data = array(
                'ake_first_name' => $this->io->post('ake_first_name'),
                'ake_last_name' => $this->io->post('ake_last_name'),
                'ake_email' => $this->io->post('ake_email'),
                'ake_gender' => $this->io->post('ake_gender'),
                'ake_address' => $this->io->post('ake_address'),
            );

            if ($this->User_model->update_user($id, $data)) {
                echo json_encode(['status' => 'success', 'message' => 'User updated successfully.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to update user.']);
            }
        } catch (Exception $e) {
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function delete_user($id)
    {
        header('Content-Type: application/json');
        if ($this->User_model->delete_user($id)) {
            echo json_encode(['status' => 'success', 'message' => 'User deleted successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete user.']);
        }
    }
}
