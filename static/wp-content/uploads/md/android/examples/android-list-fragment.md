# Android ListFragment – With Images and Text


One of the most important and common tasks in mobile app creation is listing items. To list items you can use a RecyclerView, a ListView or a ListFragment. Such lists usually containing a pairing of texts and images. For example a product list containing product images to the left, then to the right the product name, description and maybe pricing.

This is an android ListFragment tutorial. A ListFragment can show a ListView by default. Our ListView is going to be a custom one containing both images and text.


#### Section 1 : MainActivity Class

- Simply sets the activity main layout.Otherwise has nothing

```java
package com.tutorials.listfragmentimagestext;

import android.app.Activity;
import android.os.Bundle;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

}
```

#### Section 2 : PlayersFragment Class

- This class shall derive from the android.app.ListFragment class.
- Contains our Custom ListView with images and text.

```java
package com.tutorials.listfragmentimagestext;

import java.util.ArrayList;
import java.util.HashMap;

import android.app.ListFragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.SimpleAdapter;
import android.widget.Toast;

public class PlayersFragment extends ListFragment{

  String[] players={"Ander Herera","Diego Costa","Juan Mata","David De Gea","Thibaut Courtouis","Van Persie","Oscar"};
  int[] images={R.drawable.herera,R.drawable.costa,R.drawable.mata,R.drawable.degea,R.drawable.thibaut,R.drawable.vanpersie,R.drawable.oscar};

  ArrayList<HashMap<String, String>> data=new ArrayList<HashMap<String,String>>();
  SimpleAdapter adapter;

  @Override
  public View onCreateView(LayoutInflater inflater, ViewGroup container,
      Bundle savedInstanceState) {
    // TODO Auto-generated method stub

     //MAP
    HashMap<String, String> map=new HashMap<String, String>();

    //FILL
    for(int i=0;i<players.length;i++)
    {
      map=new HashMap<String, String>();
      map.put("Player", players[i]);
      map.put("Image", Integer.toString(images[i]));

      data.add(map);
    }

    //KEYS IN MAP
    String[] from={"Player","Image"};

    //IDS OF VIEWS
    int[] to={R.id.nameTxt,R.id.imageView1};

    //ADAPTER
    adapter=new SimpleAdapter(getActivity(), data, R.layout.model, from, to);
    setListAdapter(adapter);

    return super.onCreateView(inflater, container, savedInstanceState);
  }

  @Override
  public void onStart() {
    // TODO Auto-generated method stub
    super.onStart();

    getListView().setOnItemClickListener(new OnItemClickListener() {

      @Override
      public void onItemClick(AdapterView<?> av, View v, int pos,
          long id) {
        // TODO Auto-generated method stub

        Toast.makeText(getActivity(), data.get(pos).get("Player"), Toast.LENGTH_SHORT).show();

      }
    });
  }

}
```

#### Section 3 : Layouts

##### **ActivityMain.xml**

- This is the activity layout that shall be responsible for hosting our fragment.
- Add Fragment tag inside it.

```xml
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context=".MainActivity" >

    <fragment
        android_id="@+id/fragment1"
        android_name="com.tutorials.listfragmentimagestext.PlayersFragment"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_layout_marginTop="81dp" />

    <TextView
        android_id="@+id/textView1"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_layout_marginTop="38dp"
        android_text="Fragment Custom ListView"
        android_textAppearance="?android:attr/textAppearanceLarge" />

</RelativeLayout>
```

##### **Model.xml**

- Our Fragment Layout.
- This layout shall be inflated to our fragment.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    android_layout_width="match_parent"
    android_layout_height="match_parent" >

    <ImageView
        android_id="@+id/imageView1"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_alignParentTop="true"
        android_layout_marginLeft="30dp"
        android_layout_marginTop="28dp"
        android_src="@drawable/herera" />

    <TextView
        android_id="@+id/nameTxt"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentRight="true"
        android_layout_alignTop="@+id/imageView1"
        android_layout_marginTop="19dp"
        android_padding="10dp"
        android_layout_toRightOf="@+id/imageView1"
        android_text="Name"
        android_textAppearance="?android:attr/textAppearanceMedium" />

</RelativeLayout>
```

#### Result

Here is what you get:

![ListFragment With Images and Text and OnItemClick](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/listfragment.gif)
