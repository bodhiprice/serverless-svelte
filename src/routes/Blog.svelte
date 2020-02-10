<svelte:head>
  <title>Blog | Serverless Svelte</title>
</svelte:head>

<script>
  import { Router, Link, Route } from "svelte-routing";
</script>

<h1>Blog</h1>

<ul>
  <li>
    <Link to="/blog/first">Lorem ipsum dolor</Link>
  </li>
  <li>
    <Link to="/blog/second">Sed vulputate mi sit</Link>
  </li>
  <li>
    <Link to="/blog/third">Lectus magna fringilla urna</Link>
  </li>
</ul>
