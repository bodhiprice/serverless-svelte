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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id diam maecenas ultricies mi eget mauris pharetra et. Risus quis varius quam quisque id diam vel. Congue eu consequat ac felis donec. Elit ullamcorper dignissim cras tincidunt. ',
    second:
      'Sed vulputate mi sit amet mauris. Tincidunt arcu non sodales neque sodales ut etiam. Dui nunc mattis enim ut tellus. Et leo duis ut diam. Maecenas pharetra convallis posuere morbi leo urna molestie at. Nisl vel pretium lectus quam id leo in.',
    third:
      'Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. Donec enim diam vulputate ut pharetra sit amet aliquam id. Nibh tellus molestie nunc non blandit massa enim. Accumsan tortor posuere ac ut consequat semper viverra nam. '
  };
  let post = posts[slug];
</script>

<h1>Blog Post</h1>
<p>{post}</p>
