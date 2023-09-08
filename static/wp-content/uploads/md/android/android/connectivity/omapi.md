# Open Mobile API reader support


On Android 11 and higher, Open Mobile API (OMAPI) supports checking for eSE, SD, and UICC support hardware on devices with the following flags:

*   `FEATURE_SE_OMAPI_ESE`
*   `FEATURE_SE_OMAPI_SD`
*   `FEATURE_SE_OMAPI_UICC`

Use these values with `getSystemAvailableFeatures()`) or `hasSystemFeature()`) to check for device support.