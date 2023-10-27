import classNames from 'classnames';
import algorithm from '../IMGS/icon--algorithm.svg';
import automation from '../IMGS/icon--automation.svg';
import computerArchitecture from '../IMGS/icon--computer-architecture.svg';
import dataScience from '../IMGS/icon--data-science.svg';
import deepLearning from '../IMGS/icon--deep-learning.svg';
import defaultIcon from '../IMGS/icon--default.svg';
import django from '../IMGS/icon--django.svg';
import ds from '../IMGS/icon--ds.svg';
import fourthRevolution from '../IMGS/icon--fourth-revolution.svg';
import git from '../IMGS/icon--git.svg';
import introToComputer from '../IMGS/icon--intro-to-computer.svg';
import java from '../IMGS/icon--java.svg';
import jquery from '../IMGS/icon--jquery.svg';
import js from '../IMGS/icon--js.svg';
import machineLearning from '../IMGS/icon--machine-learning.svg';
import nodeJs from '../IMGS/icon--node-js.svg';
import oop from '../IMGS/icon--oop.svg';
import python from '../IMGS/icon--python.svg';
import react from '../IMGS/icon--react.svg';
import sql from '../IMGS/icon--sql.svg';
import unix from '../IMGS/icon--unix.svg';
import webPublishing from '../IMGS/icon--web-publishing.svg';

import styles from './CourseIcon.module.css';

const ICONS = {
  algorithm: algorithm,
  automation: automation,
  'computer-architecture': computerArchitecture,
  'data-science': dataScience,
  'deep-learning': deepLearning,
  default: defaultIcon,
  django: django,
  ds: ds,
  'fourth-revolution': fourthRevolution,
  git: git,
  'intro-to-computer': introToComputer,
  java: java,
  jquery: jquery,
  js: js,
  'machine-learning': machineLearning,
  'node-js': nodeJs,
  oop: oop,
  python: python,
  react: react,
  sql: sql,
  unix: unix,
  'web-publishing': webPublishing,
};

function CourseIcon({ className, photoUrl = 'default' }) {
  return (
    <img
      className={classNames(styles.courseIcon, className)}
      src={ICONS[photoUrl]}
      alt={photoUrl}>
    </img>
  );
}

export default CourseIcon;