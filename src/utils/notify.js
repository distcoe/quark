export default function notifyMe(msg, options) {
  if (!('Notification' in window)) {
    console.log('浏览器不支持消息提醒!');
  } else if (Notification.permisstion === 'granted') {
    return new Notification(msg, options);
  } else if (Notification.permisstion !== 'denied') {
    Notification.requestPermission((permisstion) => {
      if (permisstion === 'granted') {
        return new Notification(msg, options);
      }
      return null;
    });
  }
  return null;
}
