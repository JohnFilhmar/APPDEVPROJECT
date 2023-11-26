import { Card, Button } from 'flowbite-react';

const NotificationPage = () => {
  const notifications = [
    {
      id: 1,
      title: 'New Message',
      content: 'You have a new message from John Doe.',
    },
    {
      id: 2,
      title: 'Order Shipped',
      content: 'Your order #123456 has been shipped.',
    },
    {
      id: 3,
      title: 'Account Update',
      content: 'Your account information has been updated.',
    },
  ];

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5 text-gray-800 dark:text-white">Notifications</h1>

      {notifications.map((notification) => (
        <Card key={notification.id} className="mb-5 p-4">
          <h3 className="text-xl font-semibold mb-2">{notification.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{notification.content}</p>
        </Card>
      ))}

      {notifications.length === 0 && (
        <Card className="p-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">No new notifications.</p>
        </Card>
      )}

      <div className="flex justify-end mt-5">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">Clear All</Button>
      </div>
    </div>
  );
};

export default NotificationPage;
