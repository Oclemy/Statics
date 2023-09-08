# Kotlin Android Swipe Tabs Examples


In this tutorial you will learn how to use viewpager together with Tabs. This gives you a modern and powerful template as that combination is used in majority of apps in the google play store. Users can navigate to the a given page in the app either by swiping or clicking a given tab.


For Tabs we will use TabLayout API while for swiping obviously the ViewPager.

Here are the concepts you will come out of this tutorial with:

1. How to create swipable fragments with Viewpager.
2. How to use Tabs with viewpager.

## (a). Siwpable tabs and Viewpager

### Step 1: Dependences

No third party dependency is used.

### Step 2: Code

We will have three fragments, one activity and one pager adapter. Let's start by creating our fragments.

**CrimeFragment.java**

```java
package com.tutorials.hp.swpeandclicktabs;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

public class CrimeFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView=inflater.inflate(R.layout.crime_fragment,null);

        return rootView;
    }

    @Override
    public String toString() {
        return "Crime";
    }
}
```

**DramaFragment.java**

```java
package com.tutorials.hp.swpeandclicktabs;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

public class DramaFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView=inflater.inflate(R.layout.drama_fragment,null);

        return rootView;
    }

    @Override
    public String toString() {
        return "Drama";
    }
}
```

**DocumentaryFragment.java**

```java
package com.tutorials.hp.swpeandclicktabs;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

public class DocumentaryFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView=inflater.inflate(R.layout.documentary_fragment,null);

        return rootView;
    }

    @Override
    public String toString() {
        return "Documentary";
    }
}
```

**MyPagerAdapter.java**

```java
package com.tutorials.hp.swpeandclicktabs;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

import java.util.ArrayList;

public class MyPagerAdapter extends FragmentPagerAdapter {

    ArrayList<Fragment> pages=new ArrayList<>();

    public MyPagerAdapter(FragmentManager fm) {
        super(fm);
    }

    @Override
    public Fragment getItem(int position) {
        return pages.get(position);
    }

    @Override
    public int getCount() {
        return pages.size();
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return pages.get(position).toString();
    }

    //ADD A APGE
    public void addPage(Fragment f)
    {
        pages.add(f);
    }
}
```

**MainActivity.java**

```java
package com.tutorials.hp.swpeandclicktabs;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;

import static com.tutorials.hp.swpeandclicktabs.R.id.mTab_ID;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        ViewPager vp= (ViewPager) findViewById(R.id.mViewpager_ID);
        this.addOurPages(vp);

        //TAB LAYOUT
        TabLayout tabLayout= (TabLayout) findViewById(R.id.mTab_ID);
        tabLayout.setTabGravity(TabLayout.GRAVITY_FILL);
        tabLayout.setupWithViewPager(vp);
        tabLayout.setOnTabSelectedListener(listener(vp));

    }

    //ADD ALL FRAGMENTS
    private void addOurPages(ViewPager pager)
    {
        MyPagerAdapter adapter=new MyPagerAdapter(getSupportFragmentManager());
        adapter.addPage(new CrimeFragment());
        adapter.addPage(new DramaFragment());
        adapter.addPage(new DocumentaryFragment());

        pager.setAdapter(adapter);
    }

    //LISTYENER FOR OUR TABS
    private TabLayout.OnTabSelectedListener listener(final ViewPager pager)
    {
        return new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                pager.setCurrentItem(tab.getPosition());
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        };
    }

}
```

### Step 3: Layouts

Laouts files can be found in source code.

### Step 4: Run

If you run the project this is what you get:

![](https://github.com/Oclemy/SwipeAndClickabletabs/raw/master/art/swipe-and-click-tabs.gif)

### Step 5: Download

Download the code [here](https://github.com/Oclemy/SwipeAndClickabletabs/archive/refs/heads/master.zip)

## Example 2: Android Swipe Tabbed SQLite – Fragments With ListView

_Android Swipe Tabbed SQLite - Fragments With ListView Tutorial._

- First we insert data into SQLite database from a material dialog.
- Then we select according to a given category.
- The category depends on the tab.
- Each fragment consist of a ListView.
- Each ListView has data from a given category.
- The fragments are swipeable and the tabs are clickeable as well.

![Android SQLite Swipeable Tabs ListView](https://github.com/Oclemy/Tabbed-SQLite-ListView/raw/master/demos/interplanetary%20fragment.PNG)

Please download the source code above to have a full reference.

![Android Project Structure](https://github.com/Oclemy/Tabbed-SQLite-ListView/raw/master/demos/project%20structure.PNG)

#### Constants

- Holds the database constants.
- Holds also the tabel creation and deletion statements.
- Wrapping them in one place makes it easier to reuse and mainatin them from other classes.

```java
    package com.tutorials.hp.tabbedsqlitelistview.mDB;

    public class Constants {
        /*
      COLUMNS
       */
        static final String ROW_ID="id";
        static final String NAME="name";
        static final String CATEGORY="category";

        /*
        DB PROPERTIES
         */
        static final String DB_NAME="lv_DB";
        static final String TB_NAME="lv_TB";
        static final int DB_VERSION=1;

        /*
        TABLE CREATION STATEMENT
         */
        static final String CREATE_TB="CREATE TABLE lv_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
                + "name TEXT NOT NULL,category TEXT NOT NULL);";

        /*
        TABLE DELETION STMT
         */
        static final String DROP_TB="DROP TABLE IF EXISTS "+TB_NAME;

    }
```

#### DBAdapter

- The class that performs CRUD operations.
- First we insert data into sqlite from a material dialog.
- We insert from an edittext as well as category spinner.
- Then we retrieve according to the category defined by tab title.

```java
    package com.tutorials.hp.tabbedsqlitelistview.mDB;

    import android.content.ContentValues;
    import android.content.Context;
    import android.database.Cursor;
    import android.database.SQLException;
    import android.database.sqlite.SQLiteDatabase;

    import com.tutorials.hp.tabbedsqlitelistview.mModel.Spacecraft;

    import java.util.ArrayList;

    public class DBAdapter {

        Context c;
        SQLiteDatabase db;
        DBHelper helper;

        /*
        1. INITIALIZE DB HELPER AND PASS IT A CONTEXT

         */
        public DBAdapter(Context c) {
            this.c = c;
            helper = new DBHelper(c);
        }

        /*
        SAVE DATA TO DB
         */
        public boolean saveSpacecraft(Spacecraft spacecraft) {
            try {
                db = helper.getWritableDatabase();

                ContentValues cv = new ContentValues();
                cv.put(Constants.NAME, spacecraft.getName());
                cv.put(Constants.CATEGORY, spacecraft.getCategory());

                long result = db.insert(Constants.TB_NAME, Constants.ROW_ID, cv);
                if (result > 0) {
                    return true;
                }

            } catch (SQLException e) {
                e.printStackTrace();
            } finally {
                helper.close();
            }

            return false;
        }

        /*
         1. RETRIEVE SPACECRAFTS FROM DB AND POPULATE ARRAYLIST
         2. RETURN THE LIST
         */
        public ArrayList<Spacecraft> retrieveSpacecrafts(String category) {
            ArrayList<Spacecraft> spacecrafts=new ArrayList<>();

            try {
                db = helper.getWritableDatabase();

               Cursor c=db.rawQuery("SELECT * FROM "+Constants.TB_NAME+" WHERE "+Constants.CATEGORY+" = '"+category+"'",null);

                Spacecraft s;
                spacecrafts.clear();

                while (c.moveToNext())
                {
                    String s_name=c.getString(1);
                    String s_category=c.getString(2);

                    s=new Spacecraft();
                    s.setName(s_name);
                    s.setCategory(s_category);

                    spacecrafts.add(s);
                }

            } catch (SQLException e) {
                e.printStackTrace();
            } finally {
                helper.close();
            }

            return spacecrafts;
        }

    }
```

![Android SQLite ListView Insert](https://github.com/Oclemy/Tabbed-SQLite-ListView/raw/master/demos/Add%20data.PNG)

#### MainActivity

- Launcher activity.
- Show input dialog.

```java
    package com.tutorials.hp.tabbedsqlitelistview;

    import android.app.Dialog;
    import android.os.Bundle;
    import android.support.design.widget.TabLayout;
    import android.support.v4.view.ViewPager;
    import android.support.v7.app.AppCompatActivity;
    import android.support.v7.widget.Toolbar;
    import android.view.Menu;
    import android.view.MenuItem;
    import android.view.View;
    import android.widget.ArrayAdapter;
    import android.widget.Button;
    import android.widget.EditText;
    import android.widget.Spinner;
    import android.widget.Toast;

    import com.tutorials.hp.tabbedsqlitelistview.mAdapter.MyPagerAdapter;
    import com.tutorials.hp.tabbedsqlitelistview.mDB.DBAdapter;
    import com.tutorials.hp.tabbedsqlitelistview.mFragments.InterGalactic;
    import com.tutorials.hp.tabbedsqlitelistview.mFragments.InterPlanetary;
    import com.tutorials.hp.tabbedsqlitelistview.mFragments.InterStellar;
    import com.tutorials.hp.tabbedsqlitelistview.mModel.Spacecraft;

    public class MainActivity extends AppCompatActivity implements TabLayout.OnTabSelectedListener {

        private TabLayout tab;
        private ViewPager vp;
        int currentPos=0;

        EditText nameEditText;
        Button saveBtn;
        Spinner sp;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
            Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
            setSupportActionBar(toolbar);

            //VIEWPAGER AND TABS
            vp = (ViewPager) findViewById(R.id.viewpager);
            addPages();

            //SETUP TAB
            tab = (TabLayout) findViewById(R.id.tabs);
            tab.setTabGravity(TabLayout.GRAVITY_FILL);
            tab.setupWithViewPager(vp);
            tab.addOnTabSelectedListener(this);
        }

        /*
        DISPLAY INPUT DIALOG
        SAVE
         */
        private void displayDialog()
        {
            Dialog d=new Dialog(this);
            d.setTitle("SQLITE DATA");
            d.setContentView(R.layout.dialog_layout);

            //INITIALIZE VIEWS
            nameEditText= (EditText) d.findViewById(R.id.nameEditTxt);
            saveBtn= (Button) d.findViewById(R.id.saveBtn);
            sp = (Spinner) d.findViewById(R.id.category_SP);

            //SPINNER ADAPTER
            String[] categories = {InterPlanetary.newInstance().toString(),
                    InterStellar.newInstance().toString(),
                    InterGalactic.newInstance().toString()};
            sp.setAdapter(new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, categories));

            //SAVE
            saveBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    Spacecraft s = new Spacecraft();
                    s.setName(nameEditText.getText().toString());
                    s.setCategory(sp.getSelectedItem().toString());

                    if (new DBAdapter(MainActivity.this).saveSpacecraft(s)) {
                        nameEditText.setText("");
                        sp.setSelection(0);
                    } else {
                        Toast.makeText(MainActivity.this, "Not Saved", Toast.LENGTH_SHORT).show();
                    }
                }
            });

            //SHOW DIALOG
            d.show();

        }

        //FILL TAB PAGES
        private void addPages()
        {
            MyPagerAdapter myPagerAdapter=new MyPagerAdapter(getSupportFragmentManager());
            myPagerAdapter.addPage(InterPlanetary.newInstance());
            myPagerAdapter.addPage(InterStellar.newInstance());
            myPagerAdapter.addPage(InterGalactic.newInstance());

            vp.setAdapter(myPagerAdapter);
        }

        @Override
        public void onTabSelected(TabLayout.Tab tab) {
            vp.setCurrentItem(currentPos=tab.getPosition());
        }

        @Override
        public void onTabUnselected(TabLayout.Tab tab) {

        }

        @Override
        public void onTabReselected(TabLayout.Tab tab) {

        }

        @Override
        public boolean onCreateOptionsMenu(Menu menu) {
            // Inflate the menu; this adds items to the action bar if it is present.
            getMenuInflater().inflate(R.menu.menu_main, menu);

            return true;
        }
        @Override
        public boolean onOptionsItemSelected(MenuItem item) {

            int id = item.getItemId();

            if (id == R.id.addMenu) {
                displayDialog();
                return true;
            }

            return super.onOptionsItemSelected(item);
        }
    }
```

More Resources:

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Tabbed-SQLite-ListView) |
| GitHub Download Link | [Download](https://github.com/Oclemy/Tabbed-SQLite-ListView/archive/master.zip) |
