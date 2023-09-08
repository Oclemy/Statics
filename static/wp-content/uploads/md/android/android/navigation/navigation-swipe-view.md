# Create swipe views with tabs using ViewPager

Swipe views allow you to navigate between sibling screens, such as tabs, with a horizontal finger gesture, or _swipe_. This navigation pattern is also referred to as _horizontal paging_. This topic teaches you how to create a tab layout with swipe views for switching between tabs, along with how to show a title strip instead of tabs.

Implement Swipe Views
---------------------

You can create swipe views using AndroidX's `ViewPager` widget. To use ViewPager and tabs, you need to add a dependency on ViewPager and on Material Components to your project.

To set up your layout with `ViewPager`, add the `<ViewPager>` element to your XML layout. For example, if each page in the swipe view should consume the entire layout, then your layout should look like this:

```xml
    <androidx.viewpager.widget.ViewPager
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:id="@+id/pager"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
```

To insert child views that represent each page, you need to hook this layout to a `PagerAdapter`. You can choose between two kinds of built-in adapters:

*   `FragmentPagerAdapter` - Use this when navigating between a fixed, small number of sibling screens.
*   `FragmentStatePagerAdapter` - Use this when paging across an unknown number of pages. `FragmentStatePagerAdapter` optimizes memory usage by destroying fragments as the user navigates away.

As an example, here's how you might use `FragmentStatePagerAdapter` to swipe across a collection of `Fragment` objects:

### Kotlin

```kotlin
class CollectionDemoFragment : Fragment() {
    // When requested, this adapter returns a DemoObjectFragment,
    // representing an object in the collection.
    private lateinit var demoCollectionPagerAdapter: DemoCollectionPagerAdapter
    private lateinit var viewPager: ViewPager

    override fun onCreateView(inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?): View? {
       return inflater.inflate(R.layout.collection_demo, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        demoCollectionPagerAdapter = DemoCollectionPagerAdapter(childFragmentManager)
        viewPager = view.findViewById(R.id.pager)
        viewPager.adapter = demoCollectionPagerAdapter
    }
}

// Since this is an object collection, use a FragmentStatePagerAdapter,
// and NOT a FragmentPagerAdapter.
class DemoCollectionPagerAdapter(fm: FragmentManager) : FragmentStatePagerAdapter(fm) {

    override fun getCount(): Int  = 100

    override fun getItem(i: Int): Fragment {
        val fragment = DemoObjectFragment()
        fragment.arguments = Bundle().apply {
            // Our object is just an integer :-P
            putInt(ARG_OBJECT, i + 1)
        }
        return fragment
    }

    override fun getPageTitle(position: Int): CharSequence {
        return "OBJECT ${(position + 1)}"
    }
}

private const val ARG_OBJECT = "object"

// Instances of this class are fragments representing a single
// object in our collection.
class DemoObjectFragment : Fragment() {

   override fun onCreateView(inflater: LayoutInflater,
           container: ViewGroup?,
           savedInstanceState: Bundle?): View {
       return inflater.inflate(R.layout.fragment_collection_object, container, false)
   }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        arguments?.takeIf { it.containsKey(ARG_OBJECT) }?.apply {
            val textView: TextView = view.findViewById(android.R.id.text1)
            textView.text = getInt(ARG_OBJECT).toString()
        }
    }
}
```

### Java

```java
public class CollectionDemoFragment extends Fragment {
    // When requested, this adapter returns a DemoObjectFragment,
    // representing an object in the collection.
    DemoCollectionPagerAdapter demoCollectionPagerAdapter;
    ViewPager viewPager;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
            @Nullable ViewGroup container,
            @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.collection_demo, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        demoCollectionPagerAdapter = new DemoCollectionPagerAdapter(getChildFragmentManager());
        viewPager = view.findViewById(R.id.pager);
        viewPager.setAdapter(demoCollectionPagerAdapter);
   }
}

// Since this is an object collection, use a FragmentStatePagerAdapter,
// and NOT a FragmentPagerAdapter.
public class DemoCollectionPagerAdapter extends FragmentStatePagerAdapter {
    public DemoCollectionPagerAdapter(FragmentManager fm) {
        super(fm);
    }

    @Override
    public Fragment getItem(int i) {
        Fragment fragment = new DemoObjectFragment();
        Bundle args = new Bundle();
        // Our object is just an integer :-P
        args.putInt(DemoObjectFragment.ARG_OBJECT, i + 1);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public int getCount() {
        return 100;
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return "OBJECT " + (position + 1);
    }
}

// Instances of this class are fragments representing a single
// object in our collection.
public class DemoObjectFragment extends Fragment {
    public static final String ARG_OBJECT = "object";

    @Override
    public View onCreateView(LayoutInflater inflater,
            ViewGroup container, Bundle savedInstanceState) {
       return inflater.inflate(R.layout.fragment_collection_object, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        Bundle args = getArguments();
        ((TextView) view.findViewById(android.R.id.text1))
                .setText(Integer.toString(args.getInt(ARG_OBJECT)));
    }
}
```

The following sections show how you can add tabs to help facilitate navigation between pages.

Add Tabs Using a TabLayout
--------------------------

A `TabLayout` provides a way to display tabs horizontally. When used together with a `ViewPager`, a `TabLayout` can provide a familiar interface for navigating between pages in a swipe view.

![](https://developer.android.com/static/images/topic/libraries/architecture/navigation-tab-layout.png)

**Figure 1:** A `TabLayout` with four tabs.

To include a `TabLayout` in a `ViewPager`, add a `<TabLayout>` element inside of the `<ViewPager>` element, as shown below:

```xml
    <androidx.viewpager.widget.ViewPager
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:id="@+id/pager"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
    
        <com.google.android.material.tabs.TabLayout
            android:id="@+id/tab_layout"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />
    
    </androidx.viewpager.widget.ViewPager>
```

Next, use `setupWithViewPager()`) to link the `TabLayout` to the `ViewPager`. The individual tabs in the `TabLayout` are automatically populated with the page titles from the `PagerAdapter`:

### Kotlin

```kotlin
class CollectionDemoFragment : Fragment() {
    ...
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        val tabLayout = view.findViewById(R.id.tab_layout)
        tabLayout.setupWithViewPager(viewPager)
    }
    ...
}

class DemoCollectionPagerAdapter(fm: FragmentManager) : FragmentStatePagerAdapter(fm) {

    override fun getCount(): Int  = 4

    override fun getPageTitle(position: Int): CharSequence {
        return "OBJECT ${(position + 1)}"
    }
    ...
}
```

### Java

```java
public class CollectionDemoFragment extends Fragment {
    ...
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        TabLayout tabLayout = view.findViewById(R.id.tab_layout);
        tabLayout.setupWithViewPager(viewPager);
    }
    ...
}

public class DemoCollectionPagerAdapter extends FragmentStatePagerAdapter {
    ...
    @Override
    public int getCount() {
        return 4;
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return "OBJECT " + (position + 1);
    }

    ...
}
```

For additional design guidance for tab layouts, see the Material Design documentation for tabs.