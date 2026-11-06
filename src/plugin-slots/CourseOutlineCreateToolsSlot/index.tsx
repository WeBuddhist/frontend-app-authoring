import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { PLUGIN_OPERATIONS, PluginSlot } from '@openedx/frontend-plugin-framework';
import { Dropdown, Icon } from '@openedx/paragon';
import { AutoAwesome as SparkleIcon } from '@openedx/paragon/icons';

import aiMessages from '@src/ai-course-creator/messages';
import CreateToolMenuItem from './CreateToolMenuItem';
import messages from './messages';

export const CREATE_TOOLS_SLOT_ID = 'org.openedx.frontend.authoring.course_outline_create_tools.v1';

/** True when the env config inserts at least one tool into this slot. */
const hasConfiguredTools = (): boolean => Boolean(
  getConfig().pluginSlots?.[CREATE_TOOLS_SLOT_ID]?.plugins?.some(
    (plugin: { op: string }) => plugin.op === PLUGIN_OPERATIONS.Insert,
  ),
);

interface CourseOutlineCreateToolsSlotProps {
  courseId: string;
  isAiEnabled: boolean;
  onOpenAiAssistant: () => void;
}

const CourseOutlineCreateToolsSlot = ({
  courseId,
  isAiEnabled,
  onOpenAiAssistant,
}: CourseOutlineCreateToolsSlotProps) => {
  const intl = useIntl();

  // Nothing to choose from: no AI assistant and no plugged-in tools.
  if (!isAiEnabled && !hasConfiguredTools()) {
    return null;
  }

  return (
    <Dropdown className="create-tools-menu">
      <Dropdown.Toggle
        id="create-tools-menu-toggle"
        variant="primary"
        className="create-tools-menu__toggle"
      >
        <Icon src={SparkleIcon} className="create-tools-menu__toggle-icon" />
        {intl.formatMessage(messages.toggleLabel)}
      </Dropdown.Toggle>
      <Dropdown.Menu className="create-tools-menu__list">
        <PluginSlot
          id={CREATE_TOOLS_SLOT_ID}
          pluginProps={{ courseId }}
        >
          {isAiEnabled && (
            <CreateToolMenuItem
              icon={SparkleIcon}
              title={intl.formatMessage(aiMessages.menuItemTitle)}
              description={intl.formatMessage(aiMessages.menuItemDescription)}
              onClick={onOpenAiAssistant}
            />
          )}
        </PluginSlot>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export { CreateToolMenuItem };
export default CourseOutlineCreateToolsSlot;
