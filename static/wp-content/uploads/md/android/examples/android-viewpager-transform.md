# ViewPager Transform Example


The swipe capability in android apps is majorly provided by the viewpager. By no doubt this is one of the most convenient features of native apps and mobile development as a whole as compared to desktop and web development. You simply swipe your way to the next page or fragment.

However you may need to add more to this capability, inject cool animations and transitions to the viewpager. In this tutorial we want to look at some ready-made solutions for this.


## (a). ViewPagerTransforms

> Library containing common animations needed for transforming ViewPager scrolling for Android v13+.

This is a Library containing common animations needed for transforming ViewPager scrolling on Android v13+. Its is adapted and re-written from the [JazzyViewPager](https://github.com/jfeinstein10/JazzyViewPager) library and owes credit of the animation concepts directly to its source. The purpose of this rewrite is to provide an easier to use and extend implementation of ViewPager animations.

Here is an example:

![Viewpager Transformations](https://camo.githubusercontent.com/9f7c700c5a9e5175002658b3bc71c4ec71279a7531f7aa0fb995bb16b2dd25e7/687474703a2f2f692e696d6775722e636f6d2f72766845326e732e676966)

Following the following steps to use this library:

### Step 1: Install it

Install the library from maven central using the following implementation statement:

```groovy
implementation 'com.eftimoff:android-viewpager-transformers:1.0.1@aar'
```

Then sync.

### Step 2: Write Code

After installing, instantiate the transformer animation you wish to use in your code and set it as the page transformer.

```java
// Reference (or instantiate) a ViewPager instance and apply a transformer
pager = (ViewPager) findViewById(R.id.container);
pager.setAdapter(mAdapter);
pager.setPageTransformer(true, new RotateUpTransformer());
```

#### Creating Custom Transforms

All ViewPagerTransform implementations extend [ABaseTransformer](https://github.com/ToxicBakery/ViewPagerTransforms/blob/master/library/src/main/java/com/ToxicBakery/viewpager/transforms/ABaseTransformer.java) providing useful hooks improving readability of animations and basic functionality important when switching between animations. [ABaseTransformer](https://github.com/ToxicBakery/ViewPagerTransforms/blob/master/library/src/main/java/com/ToxicBakery/viewpager/transforms/ABaseTransformer.java) provides three lifecycle hooks and two flags for default handling of hiding offscreen fragments and mimicking the default paging functionality of the ViewPager.

- [onPreTransform(View view, float position)](https://github.com/ToxicBakery/ViewPagerTransforms/blob/master/library/src/main/java/com/ToxicBakery/viewpager/transforms/ABaseTransformer.java#L85)
    - Default implementation resets the animation state of the fragment to defaults that will place it on the screen if its position permits.
- [onTransform(View view, float position)](https://github.com/ToxicBakery/ViewPagerTransforms/blob/master/library/src/main/java/com/ToxicBakery/viewpager/transforms/ABaseTransformer.java#L33)
    - Animations should perform all or most of their work inside this callback.
- [onPostTransform(View view, float position)](https://github.com/ToxicBakery/ViewPagerTransforms/blob/master/library/src/main/java/com/ToxicBakery/viewpager/transforms/ABaseTransformer.java#L116)
    - Default implementation does nothing. This provides a logical location for any additional work to be done that is not directly related to the animation.

### Example

Let's now look at a full Kotlin Android Viewpager transformation animations using this library.

1.Start by installing the library as has been discussed above. 2.Then replace you main activity with following code:

**MainActivity.kt**

```kotlin
public class MainActivity extends FragmentActivity implements ActionBar.OnNavigationListener {

    private static final String KEY_SELECTED_PAGE = "KEY_SELECTED_PAGE";
    private static final String KEY_SELECTED_CLASS = "KEY_SELECTED_CLASS";
    private static final ArrayList<TransformerItem> TRANSFORM_CLASSES;

    static {
        TRANSFORM_CLASSES = new ArrayList<TransformerItem>();
        TRANSFORM_CLASSES.add(new TransformerItem(DefaultTransformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(AccordionTransformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(BackgroundToForegroundTransformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(DepthPageTransformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(ForegroundToBackgroundTransformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(CubeInTransformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(CubeOutTransformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(FlipHorizontalTransformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(FlipVerticalTransformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(RotateDownTransformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(RotateUpTransformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(StackTransformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(TabletTransformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(ZoomInTransformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(ZoomOutTranformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(ZoomOutSlideTransformer.class));
        TRANSFORM_CLASSES.add(new TransformerItem(DrawFromBackTransformer.class));
    }

    private int mSelectedItem;
    private ViewPager mPager;
    private PageAdapter mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        int selectedPage = 0;
        if (savedInstanceState != null) {
            mSelectedItem = savedInstanceState.getInt(KEY_SELECTED_CLASS);
            selectedPage = savedInstanceState.getInt(KEY_SELECTED_PAGE);
        }

        final ArrayAdapter<TransformerItem> actionBarAdapter = new ArrayAdapter<TransformerItem>(getApplicationContext(),
                android.R.layout.simple_list_item_1, android.R.id.text1, TRANSFORM_CLASSES);

        final ActionBar actionBar = getActionBar();
        actionBar.setListNavigationCallbacks(actionBarAdapter, this);
        actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_LIST);
        actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_TITLE);

        setContentView(R.layout.activity_main);

        mAdapter = new PageAdapter(getSupportFragmentManager());

        mPager = (ViewPager) findViewById(R.id.container);
        mPager.setAdapter(mAdapter);
        mPager.setCurrentItem(selectedPage);

        actionBar.setSelectedNavigationItem(mSelectedItem);
    }

    @Override
    public boolean onNavigationItemSelected(int position, long itemId) {
        mSelectedItem = position;
        try {
            mPager.setPageTransformer(true, TRANSFORM_CLASSES.get(position).clazz.newInstance());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return true;
    }

    protected void onSaveInstanceState(Bundle outState) {
        outState.putInt(KEY_SELECTED_CLASS, mSelectedItem);
        outState.putInt(KEY_SELECTED_PAGE, mPager.getCurrentItem());
    }

    public static class PlaceholderFragment extends Fragment {

        private static final String EXTRA_POSITION = "EXTRA_POSITION";
        private static final int[] COLORS = new int[]{0xFF33B5E5, 0xFFAA66CC, 0xFF99CC00, 0xFFFFBB33, 0xFFFF4444};

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
            final int position = getArguments().getInt(EXTRA_POSITION);
            final TextView textViewPosition = (TextView) inflater.inflate(R.layout.fragment_main, container, false);
            textViewPosition.setText(Integer.toString(position));
            textViewPosition.setBackgroundColor(COLORS[position - 1]);

            return textViewPosition;
        }

    }

    private static final class PageAdapter extends FragmentStatePagerAdapter {

        public PageAdapter(FragmentManager fragmentManager) {
            super(fragmentManager);
        }

        @Override
        public Fragment getItem(int position) {
            final Bundle bundle = new Bundle();
            bundle.putInt(PlaceholderFragment.EXTRA_POSITION, position + 1);

            final PlaceholderFragment fragment = new PlaceholderFragment();
            fragment.setArguments(bundle);

            return fragment;
        }

        @Override
        public int getCount() {
            return 5;
        }

    }

    private static final class TransformerItem {

        final String title;
        final Class<? extends PageTransformer> clazz;

        public TransformerItem(Class<? extends PageTransformer> clazz) {
            this.clazz = clazz;
            title = clazz.getSimpleName();
        }

        @Override
        public String toString() {
            return title;
        }

    }

}
```

### Reference

Find code reference below:

| No. | Link |
| --- | --- |
| 1. | [Example](https://github.com/ToxicBakery/ViewPagerTransforms/tree/master/app) |
| 2. | [Reference](https://github.com/ToxicBakery/ViewPagerTransforms/) |
