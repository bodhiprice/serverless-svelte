<svelte:head>
  <title>Blog Post | Serverless Svelte</title>
</svelte:head>

<script>
  // Get the slug for the current route and display content based on that value.
  export let location;
  const slug = location.pathname.split('/').pop();
  let taco = 'taco';
  // This would be where you would fetch data, but this will do for the example.
  const posts = {
    first:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    second:
      'Sed vulputate mi sit amet mauris. Tincidunt arcu non sodales neque sodales ut etiam. Dui nunc mattis enim ut tellus. Et leo duis ut diam.',
    third:
      'Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada.'
  };
  let post = posts[slug];
</script>

<h1>Blog Post</h1>
<p>{post}</p>
