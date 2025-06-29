import React from 'react';

const activities = [
  {
    user: 'Sarah Thompson',
    action: 'completed task',
    project: 'Website Redesign',
    time: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    user: 'Michael Chen',
    action: 'commented on',
    project: 'Mobile App Development',
    time: '4 hours ago',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    user: 'Emily Rodriguez',
    action: 'started task',
    project: 'User Research',
    time: '6 hours ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

function ActivityCard() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">
            <img
              src={activity.avatar}
              alt={activity.user}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span>{' '}
                {activity.action}{' '}
                <span className="font-medium">{activity.project}</span>
              </p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityCard;