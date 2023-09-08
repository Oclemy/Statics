# Android Contacts - INSERT, SELECT, SHOW



This tutorial explores examples regarding saving and retrieving Contacts in a user's android device. We will see how to do these programmatically. We see how to:

1. INSERT/SAVE contacts
2. FETCH/RETRIEVE contacts


We will be using [ContentProvider](https://camposha.info/android-examples/android-contentprovider/).

## Example 1: Save and Retrieve Contacts Programmatically

This example will teach you how to save as well as retrieve Contacts programmatically.

Here are demo images:

![View Contacts](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/View-Contacts.jpg)

![Insert Contacts example](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/Insert-Contacts-example.jpg)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special or third party dependencies are needed.

### Step 3: Design Layouts

We will have several:

**(a). activity_main.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>

    <RelativeLayout tools:context="com.example.ankitkumar.contactscontentprovider.MainActivity" android:paddingTop="@dimen/activity_vertical_margin" android:paddingRight="@dimen/activity_horizontal_margin" android:paddingLeft="@dimen/activity_horizontal_margin" android:paddingBottom="@dimen/activity_vertical_margin" android:layout_height="match_parent" android:layout_width="match_parent" android:id="@+id/activity_main" xmlns:tools="http://schemas.android.com/tools" xmlns:android="http://schemas.android.com/apk/res/android">

    <TextView android:layout_height="wrap_content" android:layout_width="wrap_content" android:id="@+id/tv_contact" android:text="CONTENT PROVIDER APP" android:layout_centerHorizontal="true" android:layout_alignParentTop="true"/>

    <Button android:layout_height="wrap_content" android:layout_width="wrap_content" android:id="@+id/buttonADD" android:text="ADD CONTACT" android:layout_centerHorizontal="true" android:layout_marginBottom="5dp" android:layout_below="@+id/tv_contact"/>

    <Button android:layout_height="wrap_content" android:layout_width="wrap_content" android:id="@+id/buttonViewAll" android:text="View All CONTACT" android:layout_centerHorizontal="true" android:layout_marginBottom="5dp" android:layout_below="@+id/buttonADD"/>

</RelativeLayout>
```

**(b). xml**

Add a ListView to this layout. The ListView will render the list of contacts

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_second"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.example.ankitkumar.contactscontentprovider.SecondActivity">
    <ListView
        android:id="@+id/lstNames"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
</RelativeLayout>
```

**(c). dialog_contact.xml**

Add editTexts for inserting name and phone number:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:layout_marginLeft="4dp"
        android:layout_marginRight="4dp"
        android:layout_marginBottom="4dp"
        android:text="Enter Contact Details"
        android:textColor="#76caec"
        android:textSize="18dp"/>

    <EditText
        android:id="@+id/diag_contact_name"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:layout_marginLeft="4dp"
        android:layout_marginRight="4dp"
        android:layout_marginBottom="4dp"
        android:hint="Name" />
    <EditText
        android:id="@+id/diag_phone_number"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="4dp"
        android:layout_marginLeft="4dp"
        android:layout_marginRight="4dp"
        android:layout_marginBottom="16dp"
        android:fontFamily="sans-serif"
        android:hint="Phone Number"/>

</LinearLayout>
```

**(d). name_and_contacts.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <LinearLayout
        android:background="@drawable/border"
        android:orientation="vertical"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
        <TextView
            android:id="@+id/contact_name"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textColor="#000000"
            android:textSize="16sp"
            android:paddingLeft="10dp"
            android:layout_marginBottom="4dp"/>
        <TextView
            android:id="@+id/contact_number"
            android:layout_width="match_parent"
            android:textSize="16sp"
            android:textColor="#000000"
            android:paddingLeft="10dp"
            android:layout_height="wrap_content" />

    </LinearLayout>

</LinearLayout>
```

### Step 5: SecondActivity

We will use the following method to fetch our list of contacts:

```java
    private void displayAllContacts(){
        ContentResolver contentResolver = getContentResolver();
        Cursor cursor = contentResolver.query(ContactsContract.Contacts.CONTENT_URI,null,null,null,null);
        if(cursor.getCount()>0){
            while (cursor.moveToNext()){
                String id = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID));
                String name = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));
                if(Integer.parseInt(cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.HAS_PHONE_NUMBER)))>0){
                    Cursor pCur = contentResolver.query(
                            ContactsContract.CommonDataKinds.Phone.CONTENT_URI,null,
                            ContactsContract.CommonDataKinds.Phone.CONTACT_ID+"=?",
                            new String[]{id},null);
                    while (pCur.moveToNext()){
                        String phoneNo = pCur.getString(pCur.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
                        al_contactName.add(name);
                        al_contactNumber.add(phoneNo);
                    }
                }

            }
        }
    }
```

The following method will allow us to render our contacts after being granted permission by the user. We check for permissions at runtime:

```java
    private void showContacts() {
        // Check the SDK version and whether the permission is already granted or not.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && checkSelfPermission(Manifest.permission.READ_CONTACTS) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.READ_CONTACTS}, PERMISSIONS_REQUEST_READ_CONTACTS);
            //After this point you wait for callback in onRequestPermissionsResult(int, String[], int[]) overriden method
        } else {
            // Android version is lesser than 6.0 or the permission is already granted.
            displayAllContacts();

        }
    }
```

Here's how we handle our permissions result:

```java
    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions,
                                           int[] grantResults) {
        if (requestCode == PERMISSIONS_REQUEST_READ_CONTACTS) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission is granted
                showContacts();
            } else {
                Toast.makeText(this, "Until you grant the permission, we cannot display the names", Toast.LENGTH_SHORT).show();
            }
        }
    }
```

Here is the full code;

**SecondActivity.java**

```java
public class SecondActivity extends AppCompatActivity {
    MyAdapter myAdapter;
    // The ListView
    private ListView lstNames;
    private ArrayList<String> al_contactName,al_contactNumber;

    private static final int PERMISSIONS_REQUEST_READ_CONTACTS = 100;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        al_contactName = new ArrayList<>();
        al_contactNumber = new ArrayList<>();
        showContacts();
        myAdapter = new MyAdapter();
        lstNames = (ListView) findViewById(R.id.lstNames);
        lstNames.setAdapter(myAdapter);
    }
    private void displayAllContacts(){
        ContentResolver contentResolver = getContentResolver();
        Cursor cursor = contentResolver.query(ContactsContract.Contacts.CONTENT_URI,null,null,null,null);
        if(cursor.getCount()>0){
            while (cursor.moveToNext()){
                String id = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID));
                String name = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));
                if(Integer.parseInt(cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.HAS_PHONE_NUMBER)))>0){
                    Cursor pCur = contentResolver.query(
                            ContactsContract.CommonDataKinds.Phone.CONTENT_URI,null,
                            ContactsContract.CommonDataKinds.Phone.CONTACT_ID+"=?",
                            new String[]{id},null);
                    while (pCur.moveToNext()){
                        String phoneNo = pCur.getString(pCur.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
                        al_contactName.add(name);
                        al_contactNumber.add(phoneNo);
                    }
                }

            }
        }
    }
    /**
     * Show the contacts in the ListView.
     */
    private void showContacts() {
        // Check the SDK version and whether the permission is already granted or not.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && checkSelfPermission(Manifest.permission.READ_CONTACTS) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.READ_CONTACTS}, PERMISSIONS_REQUEST_READ_CONTACTS);
            //After this point you wait for callback in onRequestPermissionsResult(int, String[], int[]) overriden method
        } else {
            // Android version is lesser than 6.0 or the permission is already granted.
            displayAllContacts();

        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions,
                                           int[] grantResults) {
        if (requestCode == PERMISSIONS_REQUEST_READ_CONTACTS) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission is granted
                showContacts();
            } else {
                Toast.makeText(this, "Until you grant the permission, we cannot display the names", Toast.LENGTH_SHORT).show();
            }
        }
    }

    public class MyAdapter extends BaseAdapter {

        @Override
        public int getCount() {
            return al_contactName.size();
        }

        @Override
        public Object getItem(int position) {
            return null;
        }

        @Override
        public long getItemId(int position) {
            return 0;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            ViewHolder holder;
            if(convertView == null){
                convertView = getLayoutInflater().inflate(R.layout.name_and_contacts,parent,false);
                holder = new ViewHolder();
                holder.bindView(convertView);
                convertView.setTag(holder);

            }
            else {
                holder = (ViewHolder)convertView.getTag();
            }
            holder.contactName.setText(al_contactName.get(position));
            holder.contactNumber.setText(al_contactNumber.get(position));
            return convertView;
        }
    }
    public class ViewHolder{
        TextView contactName, contactNumber;
        void bindView(View convertView){
            contactName = (TextView)convertView.findViewById(R.id.contact_name);
            contactNumber = (TextView)convertView.findViewById(R.id.contact_number);
        }
    }
}
```

### Step 6: MainActivity

Here is how we insert or save a Contact programmatically:

```java
    public void insertContact(String firstName, String mobileNumber) {
        ArrayList<ContentProviderOperation> ops = new ArrayList<ContentProviderOperation>();
        int rawContactInsertIndex = ops.size();

        ops.add(ContentProviderOperation.newInsert(RawContacts.CONTENT_URI)
                .withValue(RawContacts.ACCOUNT_TYPE, null)
                .withValue(RawContacts.ACCOUNT_NAME, null).build());
        ops.add(ContentProviderOperation
                .newInsert(Data.CONTENT_URI)
                .withValueBackReference(Data.RAW_CONTACT_ID,rawContactInsertIndex)
                .withValue(Data.MIMETYPE, CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE)
                .withValue(CommonDataKinds.StructuredName.DISPLAY_NAME, firstName) // Name of the person
                .build());
        ops.add(ContentProviderOperation
                .newInsert(Data.CONTENT_URI)
                .withValueBackReference(
                        ContactsContract.Data.RAW_CONTACT_ID,   rawContactInsertIndex)
                .withValue(Data.MIMETYPE, CommonDataKinds.Phone.CONTENT_ITEM_TYPE)
                .withValue(CommonDataKinds.Phone.NUMBER, mobileNumber) // Number of the person
                .withValue(CommonDataKinds.Phone.TYPE, CommonDataKinds.Phone.TYPE_MOBILE).build()); // Type of mobile number

        try {
            ContentProviderResult[] res = getContentResolver().applyBatch(ContactsContract.AUTHORITY, ops);
//            contactAdder.applyBatch(ContactsContract.AUTHORITY, ops);
        } catch (Exception e) {
            Toast.makeText(this, " we canot insert the names", Toast.LENGTH_SHORT).show();
            Log.e("C",e.toString());
        }
        Toast.makeText(this, "Contact Added.", Toast.LENGTH_SHORT).show();
    }
```

We will check for runtime permissions to write into contacts first:

```java
    private void writeContacts() {
        // Check the SDK version and whether the permission is already granted or not.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && checkSelfPermission(Manifest.permission.WRITE_CONTACTS) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.WRITE_CONTACTS}, PERMISSIONS_REQUEST_WRITE_CONTACTS);
            //After this point you wait for callback in onRequestPermissionsResult(int, String[], int[]) overriden method
        } else {
            // Android version is lesser than 6.0 or the permission is already granted.
            //createContact(diag_contactName,diag_contactNumber);
            insertContact(diag_contactName, diag_contactNumber);
        }
    }
```

Here's the full code:

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    // Request code for READ_CONTACTS. It can be any number > 0.
    private static final int PERMISSIONS_REQUEST_WRITE_CONTACTS = 100;
    ContentResolver contentResolver;
    Button buttonAdd, buttonViewAll;
    Intent intent;
    EditText ev_diag_contactName,ev_diag_contactNumber;
    String diag_contactName,diag_contactNumber;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        buttonAdd = (Button) findViewById(R.id.buttonADD);
        buttonViewAll = (Button) findViewById(R.id.buttonViewAll);

        buttonAdd.setOnClickListener(this);
        buttonViewAll.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch(view.getId()){
            case R.id.buttonADD:
                addItem();
                Toast.makeText(MainActivity.this,"buttonADD Clicked",Toast.LENGTH_LONG).show();
                break;
            case R.id.buttonViewAll:
                intent = new Intent(MainActivity.this,SecondActivity.class);
                startActivity(intent);
                Toast.makeText(MainActivity.this,"buttonViewAll Clicked",Toast.LENGTH_LONG).show();
                break;
            default:
                break;
        }
    }

    public void addItem(){
        AlertDialog.Builder alertDialog = new AlertDialog.Builder(MainActivity.this);

        // Get the layout inflater
        LayoutInflater inflater = this.getLayoutInflater();

        // Inflate and set the layout for the dialog
        // Pass null as the parent view because its going in the dialog layout
        alertDialog.setView(inflater.inflate(R.layout.dialog_contact, null))
                // Add action buttons
                .setPositiveButton("Save", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int id) {
                        Dialog diag = (Dialog) dialog;
                        ev_diag_contactName = (EditText) diag.findViewById(R.id.diag_contact_name);
                        ev_diag_contactNumber = (EditText) diag.findViewById(R.id.diag_phone_number);

                        diag_contactName = ev_diag_contactName.getText().toString();
                        diag_contactNumber = ev_diag_contactNumber.getText().toString();

                        Log.e("addItem ",diag_contactName);
                        writeContacts();
                    }
                })
                .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.cancel();
                    }
                });
        alertDialog.show();
    }

    private void writeContacts() {
        // Check the SDK version and whether the permission is already granted or not.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && checkSelfPermission(Manifest.permission.WRITE_CONTACTS) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.WRITE_CONTACTS}, PERMISSIONS_REQUEST_WRITE_CONTACTS);
            //After this point you wait for callback in onRequestPermissionsResult(int, String[], int[]) overriden method
        } else {
            // Android version is lesser than 6.0 or the permission is already granted.
            //createContact(diag_contactName,diag_contactNumber);
            insertContact(diag_contactName, diag_contactNumber);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions,
                                           int[] grantResults) {
        if (requestCode == PERMISSIONS_REQUEST_WRITE_CONTACTS) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission is granted
                writeContacts();
            } else {
                Toast.makeText(this, "Until you grant the permission, we canot display the names", Toast.LENGTH_SHORT).show();
            }
        }
    }

    public void insertContact(String firstName, String mobileNumber) {
        ArrayList<ContentProviderOperation> ops = new ArrayList<ContentProviderOperation>();
        int rawContactInsertIndex = ops.size();

        ops.add(ContentProviderOperation.newInsert(RawContacts.CONTENT_URI)
                .withValue(RawContacts.ACCOUNT_TYPE, null)
                .withValue(RawContacts.ACCOUNT_NAME, null).build());
        ops.add(ContentProviderOperation
                .newInsert(Data.CONTENT_URI)
                .withValueBackReference(Data.RAW_CONTACT_ID,rawContactInsertIndex)
                .withValue(Data.MIMETYPE, CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE)
                .withValue(CommonDataKinds.StructuredName.DISPLAY_NAME, firstName) // Name of the person
                .build());
        ops.add(ContentProviderOperation
                .newInsert(Data.CONTENT_URI)
                .withValueBackReference(
                        ContactsContract.Data.RAW_CONTACT_ID,   rawContactInsertIndex)
                .withValue(Data.MIMETYPE, CommonDataKinds.Phone.CONTENT_ITEM_TYPE)
                .withValue(CommonDataKinds.Phone.NUMBER, mobileNumber) // Number of the person
                .withValue(CommonDataKinds.Phone.TYPE, CommonDataKinds.Phone.TYPE_MOBILE).build()); // Type of mobile number

        try {
            ContentProviderResult[] res = getContentResolver().applyBatch(ContactsContract.AUTHORITY, ops);
//            contactAdder.applyBatch(ContactsContract.AUTHORITY, ops);
        } catch (Exception e) {
            Toast.makeText(this, " we canot insert the names", Toast.LENGTH_SHORT).show();
            Log.e("C",e.toString());
        }
        Toast.makeText(this, "Contact Added.", Toast.LENGTH_SHORT).show();
    }

}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment20.1/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |
