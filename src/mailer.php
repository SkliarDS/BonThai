<?php
	
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	// Автоподключение модулей
	require 'vendor/autoload.php';

	//Create an instance; passing `true` enables exceptions
	$mail = new PHPMailer(true);	
	
	try {

		// Настройки PHP mailer
		$mail->CharSet = 'UTF-8';
		$mail->setLanguage('ru', 'phpmailer/language/');
		$mail->IsHTML(true);

		// Настройки письма
		$mail->setFrom('info@rightblog.ru', 'Клиент'); // От кого
		$mail->addAddress('1980sds80@mail.ru'); // Кому 
		$mail->Subject = 'Сообщение с сайта'; // Тема письма	

		// Serialize form fields - that filled-in by User
		foreach ( $_POST as $key => $value ) {
			if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" && $key != "email_from" ) {
				$message .= "
				" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
			</tr>
			";
			}
		}

		// Create message text for sending on email
		$message = "<table style='width: 100%;'>$message</table>";

		// Тело письма
		$mail->Body = $message;

		//Attachments
		// Проверка: есть ли прикрепленные файлы, еслои есть - то добавляем их к письму
		if (isset($_FILES['fileUpload']['name'])) {
			$target_dir = __DIR__ . '/files/';
			$total_files = count($_FILES['fileUpload']['name']);
			for ($key = 0; $key < $total_files; $key++) {
				// Check if file is selected
				if (
					isset($_FILES['fileUpload']['name'][$key])
					&& $_FILES['fileUpload']['size'][$key] > 0
				) {
					$original_filename = $_FILES['fileUpload']['name'][$key];
					$target = $target_dir . basename($original_filename);
					$tmp  = $_FILES['fileUpload']['tmp_name'][$key];
					move_uploaded_file($tmp, $target);

					//Attachments
					$mail->addAttachment($target, $original_filename);
				}
			}
		}

		// Отправка письма
		$mail->send();

		// echo 'Message has been sent';
		echo 'SUCCESS';
	} catch (Exception $e) {
		echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
	}
