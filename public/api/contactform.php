<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoloap.php';
require_once('../../config/email_config.php');

$output = [
    'success' => false
];

$postData = json_decode(file_get_contents('php://input'), true);

$first_name = $postData['firstName'];
$last_name = $postData['lastName'];
$phone = $postData['phoneNumber'];
$email = $postData['email'];
$message = $postData['message'];

$mail = new PHPMailer(true);  
    

try {
    //Server Settings
    //Enable SMTP debugging
    // SMTP::DEBUG_OFF = off (for production use)
    // SMTP::DEBUG_CLIENT = client messages
    // SMTP::DEBUG_SERVER = client and server messages
    $mail->SMTPDebug = SMTP::DEBUG_OFF;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;                              
    $mail->Username = EMAIL_USER;                
    $mail->Password = EMAIL_PASSWORD;     
    $mail->SMTPSecure = $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;;                
    $mail->Port = 587;

    //Recipients
    $mail->setFrom($email, $first_name.' '.$last_name);
    $mail->addAddress('fundthatfilm@gmail.com', 'Fund That Film');
    $mail->addReplyTo($email, $first_name.' '.$last_name);

    $mail->isHTML(true);                              
    $mail->Subject = "New message from 'Fund That Film'";
    $mail->Body    = 'First Name: '.$first_name.'<br>'
                    .'Last Name: '.$last_name.'<br>'
                    .'Phone: '.$phone.'<br>'
                    .'Email: '.$email.'<br>'
                    .'Message: '.$message;
    $mail->AltBody = 'First Name: '.$first_name.' | '
                    .'Last Name: '.$last_name.' | '
                    .'Phone: '.$phone.' | '
                    .'Email: '.$email.' | '
                    .'Message: '.$message;;

    $mail->send();

    $output['message'] = 'Email sent successfully';
    $output['success'] = true;

    print(json_encode($output));

} catch (Exception $e) {
    $output['error'] = 'Error sending email';

    print(json_encode($output));
}

?>