# CourseOutlineCreateToolsSlot

### Slot ID: `org.openedx.frontend.authoring.course_outline_create_tools.v1`

### Plugin Props:

* `courseId` - String. The ID of the course whose outline is being built.

## Description

The slot is the list inside the "Create with a tool" menu on the empty Course Outline page (shown only when the
course has no sections). Each item is a tool that builds the course outline for the author.

By default the slot contains the "AI assistant" item, which opens the AI course-creator chatbot. That item only shows
when the AI course creator is enabled. The outline's own "New section" buttons come below the menu, under "or build it
yourself". If the AI course creator is disabled and no plugin is inserted into this slot, the "Create with a tool"
button is not shown at all, and the empty outline looks as it does in Open edX.

Use the exported `CreateToolMenuItem` component so that inserted tools look like the default one:

* `icon` - Paragon icon.
* `title` - Tool name.
* `description` - One line explaining what the tool does.
* `badge` - Optional short label next to the title, e.g. "New".
* `href` - Link to the tool, or
* `onClick` - Click handler.

## Example

The following example configuration inserts a tool below the AI assistant.

```js
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { Mic } from '@openedx/paragon/icons';
import { CreateToolMenuItem } from '@src/plugin-slots/CourseOutlineCreateToolsSlot';

const MyTool = ({ courseId }) => (
  <CreateToolMenuItem
    icon={Mic}
    title="From a teaching recording"
    description="Upload a teaching recording and turn it into a course."
    href={`https://studio.example.com/my-tool/course/${courseId}`}
  />
);

const config = {
  pluginSlots: {
    'org.openedx.frontend.authoring.course_outline_create_tools.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'my-create-tool',
            priority: 60,
            type: DIRECT_PLUGIN,
            RenderWidget: MyTool,
          },
        },
      ],
    },
  },
};

export default config;
```
