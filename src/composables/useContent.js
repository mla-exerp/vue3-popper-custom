import { ref, onMounted, onBeforeUnmount, watch } from "vue";
export default function useContent(slots, popperNode, content) {
  let observer = null;
  const hasContent = ref(false);

  onMounted(() => {
    console.log('onMounted popperNode value', popperNode.value)
    console.log('onMounted slots', slots)
    console.log('onMounted content', content)
    if (slots.content !== undefined || content.value) {
      hasContent.value = true;
    }
    console.log('before MutationObserver')
    observer = new MutationObserver(checkContent);
    console.log('after MutationObserver ', observer)
    observer.observe(popperNode.value, {
      childList: true,
      subtree: true,
    });
    console.log('after observer.observe')
  });

  onBeforeUnmount(() => {
    console.log('onBeforeUnmount popperNode value', popperNode.value)
    if (observer) {
    }
    observer.disconnect()
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
