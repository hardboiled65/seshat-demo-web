<template>
  <div id="demos" class="app-component">
    <div id="group-demos" class="demos-list-group">
      <ul id="list-demos">
        <li id="list-demos-browse">
          <router-link to="/browse" class="link-demos" id="link-demos-browse">
            <img src="/img/icon-browse.png" width="96px"><span>Character Browser</span>
          </router-link>
        </li>
        <li id="list-demos-segmentation">
          <router-link to="/segmentation" class="link-demos" id="link-demos-segmentation">
            <img src="/img/icon-no.png" width="96px"><span>Text Segmentations</span>
          </router-link>
        </li>
        <li id="list-demos-normalize">
          <router-link to="/normalize" class="link-demos" id="link-demos-normalize">
            <img src="/img/icon-no.png" width="96px"><span>Normalization</span>
          </router-link>
        </li>
      </ul>
    </div> <!-- demo-list -->
    <div id="group-supports" class="demos-list-group">
      <p></p>
      <ul>
      </ul>
    </div>
  </div> <!-- demos -->
</template>

<script>
export default {
    name: 'demos'
}
</script>
