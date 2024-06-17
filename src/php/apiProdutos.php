<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("dbConnection.php");

$request_method = $_SERVER["REQUEST_METHOD"];

switch($request_method) {
    case 'GET':
        get_produtos();
        break;
    case 'POST':
        add_produtos();
        break;
    case 'PUT':
        update_produtos();
        break;
    case 'DELETE':
        delete_produtos();
        break;
    case 'OPTIONS':
        // Para pré-voo CORS
        header("HTTP/1.1 200 OK");
        break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_produtos() {
    global $mysqli;
    $query = "SELECT * FROM produtos ORDER BY id_produto DESC";
    $result = mysqli_query($mysqli, $query);
    $produtos = array();
    while($row = mysqli_fetch_assoc($result)) {
        $produtos[] = $row;
    }
    echo json_encode($produtos);
}

function add_produtos() {
    global $mysqli;
    $data = json_decode(file_get_contents("php://input"), true);
    $nome = $data["nome"];
    $preco = $data["preco"];
    $descricao = $data["descricao"];
    error_log("Dados recebidos: nome=$nome, preco=$preco, descricao=$descricao");
    $query = "INSERT INTO produtos (nome, preco, descricao) VALUES('$nome', '$preco', '$descricao')";
    if (mysqli_query($mysqli, $query)) {
        $response = array('status' => 1, 'status_message' => 'Product Added Successfully.');
    } else {
        $response = array('status' => 0, 'status_message' => 'Product Addition Failed.');
    }
    echo json_encode($response);
}

function update_produtos() {
    global $mysqli;
    $data = json_decode(file_get_contents("php://input"), true);
    $id_produto = $data["id_produto"];
    $nome = $data["nome"];
    $preco = $data["preco"];
    $descricao = $data["descricao"];
    $query = "UPDATE produtos SET nome='$nome', preco='$preco', descricao='$descricao' WHERE id_produto=$id_produto";
    if (mysqli_query($mysqli, $query)) {
        $response = array('status' => 1, 'status_message' => 'Product Updated Successfully.');
    } else {
        $response = array('status' => 0, 'status_message' => 'Product Updation Failed.');
    }
    echo json_encode($response);
}

function delete_produtos() {
    global $mysqli;
    $id_produto = intval($_GET["id_produto"]);
    $query = "DELETE FROM produtos WHERE id_produto=$id_produto";
    if (mysqli_query($mysqli, $query)) {
        $response = array('status' => 200, 'status_message' => 'Product Deleted Successfully.');
    } else {
        $response = array('status' => 0, 'status_message' => 'Product Deletion Failed.');
    }
    echo json_encode($response);
}
?>
