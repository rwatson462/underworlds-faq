import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type SnackbarProps = {
  text: string,
  color?: string,
}

export const useSnackbarStore = defineStore(
  'snackbar',
  () => {
    const text = ref('')
    const color = ref('')
    const show = computed(() => text.value !== '')

    function setText(newText: string) {
      text.value = newText
    }

    function setColor(newColor: string) {
      color.value = newColor
    }

    return {
      show,
      text,
      color,
      hide() {
        setText('')
      },
      trigger({ text, color = 'primary' }: SnackbarProps) {
        setColor(color)
        setText(text)
      }
    }
  }
)
