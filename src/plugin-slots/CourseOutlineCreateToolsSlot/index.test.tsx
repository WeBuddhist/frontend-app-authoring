import { getConfig, setConfig } from '@edx/frontend-platform';
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import {
  fireEvent, render, screen, initializeMocks,
} from '@src/testUtils';
import CourseOutlineCreateToolsSlot, { CREATE_TOOLS_SLOT_ID } from '.';
import messages from './messages';

const courseId = 'course-v1:org+101+2026';

const renderSlot = (props = {}) => render(
  <CourseOutlineCreateToolsSlot
    courseId={courseId}
    isAiEnabled
    onOpenAiAssistant={jest.fn()}
    {...props}
  />,
);

describe('CourseOutlineCreateToolsSlot', () => {
  const originalConfig = getConfig();

  beforeEach(() => initializeMocks());
  afterEach(() => setConfig(originalConfig));

  test('shows the AI assistant in the menu and opens it', () => {
    const onOpenAiAssistant = jest.fn();
    renderSlot({ onOpenAiAssistant });

    fireEvent.click(screen.getByRole('button', { name: messages.toggleLabel.defaultMessage }));
    fireEvent.click(screen.getByText('AI assistant'));

    expect(onOpenAiAssistant).toHaveBeenCalled();
  });

  test('shows nothing when the AI assistant is off and no tool is plugged in', () => {
    renderSlot({ isAiEnabled: false });

    expect(screen.queryByRole('button', { name: messages.toggleLabel.defaultMessage })).not.toBeInTheDocument();
  });

  test('shows plugged-in tools with the course ID', () => {
    const PluggedTool = ({ courseId: id }: { courseId: string }) => <span>Plugged tool for {id}</span>;
    setConfig({
      ...originalConfig,
      pluginSlots: {
        [CREATE_TOOLS_SLOT_ID]: {
          keepDefault: true,
          plugins: [{
            op: PLUGIN_OPERATIONS.Insert,
            widget: {
              id: 'plugged-tool', priority: 60, type: DIRECT_PLUGIN, RenderWidget: PluggedTool,
            },
          }],
        },
      },
    });
    renderSlot({ isAiEnabled: false });

    fireEvent.click(screen.getByRole('button', { name: messages.toggleLabel.defaultMessage }));

    expect(screen.getByText(`Plugged tool for ${courseId}`)).toBeInTheDocument();
    expect(screen.queryByText('AI assistant')).not.toBeInTheDocument();
  });
});
