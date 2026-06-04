<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody ?: '', true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid request']);
    exit;
}

function clean_field(array $payload, string $key, int $maxLength): string
{
    $value = isset($payload[$key]) ? (string) $payload[$key] : '';
    $value = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '');
    return mb_substr($value, 0, $maxLength, 'UTF-8');
}

$firstName = clean_field($payload, 'firstName', 80);
$lastName = clean_field($payload, 'lastName', 80);
$email = clean_field($payload, 'email', 254);
$phoneCountry = clean_field($payload, 'phoneCountry', 20);
$phone = clean_field($payload, 'phone', 40);
$message = clean_field($payload, 'message', 5000);
$preferredMethod = clean_field($payload, 'preferredContactMethod', 20);
$submittedAt = clean_field($payload, 'submittedAt', 40);

if ($preferredMethod !== 'call') {
    $preferredMethod = 'email';
}

if ($phoneCountry !== 'UK') {
    $phoneCountry = 'USA';
}

if ($firstName === '' || $lastName === '' || $email === '' || $phone === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid email address']);
    exit;
}

$to = 'hello@hollycroftglobal.com';
$subjectName = preg_replace('/[^a-zA-Z0-9 .\'-]/', '', $firstName . ' ' . $lastName);
$subject = 'Website enquiry from ' . trim($subjectName);
$body = implode("\n", [
    'New Hollycroft Global website enquiry',
    '',
    'First name: ' . $firstName,
    'Last name: ' . $lastName,
    'Email: ' . $email,
    'Phone country: ' . $phoneCountry,
    'Phone: ' . $phone,
    'Preferred contact method: ' . $preferredMethod,
    '',
    'Message:',
    $message,
    '',
    'Submitted at: ' . ($submittedAt !== '' ? $submittedAt : gmdate('c'))
]);

$headers = [
    'From: Hollycroft Global Website <hello@hollycroftglobal.com>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Email could not be sent']);
    exit;
}

echo json_encode(['ok' => true]);
