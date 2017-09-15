<?php
    if(!empty($_POST['name']) and !empty($_POST['email']) and !empty($_POST['text'])){
        $name = trim(strip_tags($_POST['name']));
        $email = trim(strip_tags($_POST['email']));
        $text = trim(strip_tags($_POST['text']));

        mail('zukaaman@gmail.com', 'Письмо с адрес_вашего_сайта', 'Вам написал: '.$name.'<br />Его почта: '.$email.'<br />Его сообщение: '.$text,"Content-type:text/html;charset=windows-1251");
        exit;
    }
?>
