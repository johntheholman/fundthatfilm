<?php 

    $postData = json_decode(file_get_contents('php://input'), true);

    require_once('../../config/email_config.php');

    $output = [
        'success' => false
    ];

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require '../../vendor/phpmailer/phpmailer/src/Exception.php';
    require '../../vendor/phpmailer/phpmailer/src/PHPMailer.php';
    require '../../vendor/phpmailer/phpmailer/src/SMTP.php';

    $mail = new PHPMailer(true);  
    $first_name = $postData['firstName'];
    $last_name = $postData['lastName'];
    $phone = $postData['phoneNumber'];
    $email = $postData['email'];
    $message = $postData['message'];

    try {

        $mail->SMTPDebug = 0;                                 
        $mail->isSMTP();                               
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;                              
        $mail->Username = EMAIL_USER;                
        $mail->Password = EMAIL_PASSWORD;     
        $mail->SMTPSecure = 'tls';                
        $mail->Port = 587;
        
        $options = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ];

        $mail->smtpConnect($options);

        $mail->setFrom(EMAIL_USER);
        $mail->addAddress(EMAIL_USER);              
        $mail->addReplyTo($email);

        $mail->isHTML(true);                              
        $mail->Subject = "Message from 'Fund That Film'";
        $mail->Body    = 'First Name: '.$first_name.'<br>'
                        .'Last Name: '.$last_name.'<br>'
                        .'Phone: '.$phone.'<br>'
                        .'Email: '.$email.'<br>'
                        .'Message: '.$message;
        $mail->AltBody = htmlentities($message);

        $mail->send();

        $output['message'] = 'Email sent successfully';
        $output['success'] = true;

        print(json_encode($output));

    } catch (Exception $e) {
        $output['error'] = 'Error sending email';

        print(json_encode($output));
    }

?>