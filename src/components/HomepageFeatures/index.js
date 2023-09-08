import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Understand',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Simple easy to understand Python How-To snippets.
      </>
    ),
  },
  {
    title: 'Multi-Language',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Find snippets with explanations in multiple languages like English, Spasnish, French, German, Korean, Japanese etc.
      </>
    ),
  },
  {
    title: 'Super Fast',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        No more time waiting for page loads. Our site is highly optimized and very fast.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
