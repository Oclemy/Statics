
# Process managers for Express apps



**Warning**:
This information refers to third-party sites,
products, or modules that are not maintained by the Expressjs team. Listing here does not constitute
an endorsement or recommendation from the Expressjs project team.



When you run Express apps for production, it is helpful to use a *process manager* to:


* Restart the app automatically if it crashes.
* Gain insights into runtime performance and resource consumption.
* Modify settings dynamically to improve performance.
* Control clustering.


A process manager is somewhat like an application server: it’s a “container” for applications that facilitates deployment, provides high availability, and enables you to manage the application at runtime.


The most popular process managers for Express and other Node.js applications are:


* **[Forever](https://github.com/foreverjs/forever)**: A simple command-line interface tool to ensure that a script runs continuously (forever). Forever’s simple interface makes it ideal for running smaller deployments of Node.js apps and scripts.
* **[PM2](https://github.com/Unitech/pm2)**: A production process manager for Node.js applications that has a built-in load balancer. PM2 enables you to keep applications alive forever, reloads them without downtime, helps you to manage application logging, monitoring, and clustering.
* **[StrongLoop Process Manager (Strong-PM)](http://strong-pm.io/)**: A production process manager for Node.js applications with built-in load balancing, monitoring, and multi-host deployment. Includes a CLI to build, package, and deploy Node.js applications to a local or remote system.
* **SystemD**: The default process manager on modern Linux distributions, that makes it simple to run a Node application as a service. For more information, see [“Run node.js service with systemd” by Ralph Slooten (@axllent)](https://www.axllent.org/docs/view/nodejs-service-with-systemd/).






