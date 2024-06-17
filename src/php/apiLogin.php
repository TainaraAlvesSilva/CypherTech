<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");
require_once("dbConnection.php");

$request_method = $_SERVER["REQUEST_METHOD"];

switch($request_method) {
    case 'POST':
        // Handle POST request
        login();
        break;
        case 'OPTIONS':
            // Para pré-voo CORS
            header("HTTP/1.1 200 OK");
            break;
        default:
            header("HTTP/1.0 405 Method Not Allowed");
            break;
    }
    function login() {
        global $mysqli;
        $data = json_decode(file_get_contents("php://input"), true);
        $usuario = $data["usuario"];
        $senha = $data["senha"];
    
        // Consulta no banco de dados para verificar se o usuário existe
        $query = "SELECT * FROM user WHERE usuario = ?";
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("s", $usuario);
        $stmt->execute();
        $result = $stmt->get_result();
    
        if ($result->num_rows == 1) {
            $user = $result->fetch_assoc();
            // Verifique se a senha fornecida pelo usuário corresponde ao hash no banco de dados
            if (password_verify($senha, $user['senha'])) {
                // Usuário autenticado com sucesso
                $response = array('status' => 1, 'status_message' => 'Login Successful.');
            } else {
                // Senha incorreta
                $response = array('status' => 0, 'status_message' => 'Invalid Username or Password.');
            }
        } else {
            // Usuário não encontrado
            $response = array('status' => 0, 'status_message' => 'Invalid Username or Password.');
        }
    
        echo json_encode($response);
    }
    