export interface CompatibleInputEvent {
    data?: string  |null;
    inputType?: string;
    navigationType?: string;
    originalEvent: KeyboardEvent | InputEvent;
  }


  export const IS_INPUT_SUPPORTED = (function() {
    try {
      // just kill browsers off, that throw an error if they don't know
      // `InputEvent`
      const event = new InputEvent('input', {
        data: 'xyz',
        inputType: 'deleteContentForward'
      });
      let support = false;
  
      // catch the others
      // https://github.com/chromium/chromium/blob/c029168ba251a240b0ec91fa3b4af4214fbbe9ab/third_party/blink/renderer/core/events/input_event.cc#L78-L82
      const el = document.createElement('input');
      el.addEventListener('input', function(e) {
        if ((e as any).inputType === 'deleteContentForward') {
          support = true;
        }
      });
  
      el.dispatchEvent(event);
      return support;
    } catch (error) {
      return false;
    }
  })();


  export const normalizeInputEvent = function(event: KeyboardEvent | InputEvent): CompatibleInputEvent {
    const e: CompatibleInputEvent = {
      originalEvent: event
    };
  
    if (event instanceof KeyboardEvent) {
      if (event.key === 'Backspace') {
        e.inputType = 'deleteContentBackward';
        e.navigationType = 'cursorLeft';
      } else if (event.key === 'Delete') {
        e.inputType = 'deleteContentForward';
      } else if (event.key.startsWith('Arrow')) {
        e.navigationType = event.key.replace('Arrow', 'cursor');
      } else {
        e.data = event.key;
        e.inputType = 'insertText';
      }
    } else {
      // @ts-ignore event.inputType is there on android - actually what we need here!
      const { inputType } = event;
      e.inputType = inputType;
      e.data = event.data;
  
      if (inputType === 'insertText') {
        e.navigationType = 'cursorRight';
      }
    }
  
    return e;
  };