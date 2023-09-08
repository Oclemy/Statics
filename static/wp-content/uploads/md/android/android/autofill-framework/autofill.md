# Autofill framework

Learn about the autofill framework, which is available in Android 8.0 (API level 26) and higher.

Some apps, such as password managers, can fill out the views in other apps with data previously provided by the user. These apps that fill out other apps are called _autofill services_. The autofill framework manages the communication between an app and an autofill service.

Filling out forms is a time-consuming and error-prone task. Users can easily get frustrated with apps that require such actions. The autofill framework improves the user experience by providing the following benefits:

*   **Less time spent in filling fields.** Autofill saves users from re-typing information.
*   **Minimize user input errors.** Typing is prone to errors, especially on mobile devices. Minimizing the need to type information also minimizes typos.

Components
----------

The autofill framework contains the following high-level components:

*   **Autofill services:** Apps such as password managers that save and store the user information that can be used in views across multiple apps.
*   **Autofill clients:** Apps that provide the views that need to be filled out or that hold the user's data.
*   **Android system:** The OS that defines the workflow and provides the infrastructure that makes services and clients work together.

For a detailed explanation of the autofill workflow, see the `AutofillService` and `AutofillManager` reference documentation.

