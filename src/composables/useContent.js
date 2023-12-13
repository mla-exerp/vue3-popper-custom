import { ref, onMounted, onBeforeUnmount, watch } from "vue";
export default function useContent(slots, popperNode, content) {
let rnd = Math.random()

  let observer = null;
  const hasContent = ref(false);

  onMounted(() => {
    console.log(rnd + ' onMounted popperNode value', popperNode.value)
    console.log(rnd + ' onMounted slots', slots)
    console.log(rnd + ' onMounted content', content)
    if (slots.content !== undefined || content.value) {
      hasContent.value = true;
    }
    console.log(rnd + ' before MutationObserver')
    observer = new MutationObserver(checkContent);
    console.log('after MutationObserver ', observer)
    observer.observe(popperNode.value, {
      childList: true,
      subtree: true,
    });
    console.log(rnd + ' after observer.observe')
  });

  onBeforeUnmount(() => {
    console.log(rnd + ' onBeforeUnmount popperNode value', popperNode.value)
    if (observer) {
      observer.disconnect()
      console.log('observer.disconnect()')
    }
    console.log(rnd + ' onBeforeUnmount observer', observer)
  });

  /**
   * Watch the content prop
   */
  watch(content, content => {
    if (content) {
      hasContent.value = true;
    } else {
      hasContent.value = false;
    }
  });

  /**
   * Check the content slot
   */
  const checkContent = () => {
    if (slots.content) {
      hasContent.value = true;
    } else {
      hasContent.value = false;
    }
  };

  return {
    hasContent,
  };
}
