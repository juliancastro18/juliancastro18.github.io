<?php
    $name = $_POST['name'];
    $visitor_email = $_POST['email'];
    $message = $_POST['message'];

    $email_from = 'juliancastro18k@gmail.com';

    $email_subject = "Nuevo mensaje desde portfolio"

    $email_body = "Nombre: $name\n".
                    "Email: $visitor_email\n".
                        "Mensaje: $message\n";

    $to = "jcast18k@gmail.com";

    $headers = "De: $email_from \r\n";

    $headers .= "Responder a: $visitor_email \r\n";

    mail($to,$email_subject,$email_body,$headers);

    header("Location: index.html");
?>