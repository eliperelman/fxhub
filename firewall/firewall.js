'use strict';

let exec = require('mz/child_process').exec;

module.exports = {
  forwardPort: handleForwardPort('I'),
  unforwardPort: handleForwardPort('D')
};

function commit() {
  return exec(`sudo bash -c "iptables-save > /etc/iptables/rules.v4"`);
}

// Protocol can be tcp, udp, icmp, or all
function handleForwardPort(action) {
  return (external, internal, ip, protocol) => {
    return exec(`sudo iptables -${action} PREROUTING -t nat -i eth0 -p ${protocol} --dport ${external} -j DNAT --to ${ip}:${internal}`)
      .then(() => exec(`sudo iptables -${action} FORWARD -p ${protocol} -d ${ip} --dport ${internal} -j ACCEPT`))
      .then(commit);
  };
}
