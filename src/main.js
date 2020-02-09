import App from './App.svelte';
import './utils.css';

new App({
  target: document.getElementById('app'),
  hydrate: true
});
