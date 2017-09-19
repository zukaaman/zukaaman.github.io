<?
if (isset ($_POST['text'])) {
  mail ("zka18@yandex.ru",
        "заполнена контактная форма с ".$_SERVER['HTTP_REFERER'],
        "Имя: ".$_POST['name']."\nEmail: ".$_POST['email']."\nСообщение: ".$_POST['text']);
  echo ('<p style="color: green">Ваше сообщение получено, спасибо!</p>');
}
?>
