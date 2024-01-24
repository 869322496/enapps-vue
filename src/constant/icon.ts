/* 引用图标 */
// 引入示例，按需引入。
// import { faCopy as farCopy } from '@fortawesome/free-regular-svg-icons';
// import { faCopy as fasCopy } from '@fortawesome/free-solid-svg-icons';
// import { faTwitter, faApple } from '@fortawesome/free-brands-svg-icons';
// import { faHome as fasHome } from '@fortawesome/free-solid-svg-icons';
// export default [fasHome];

// 全部引入 有bug会覆盖 key相同
import * as sIcons from '@fortawesome/free-solid-svg-icons';
import * as bIcons from '@fortawesome/free-brands-svg-icons';
import * as rIcons from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
const filteredIcons: IconDefinition[] = [
  ...Object.values(bIcons),
  ...Object.values(rIcons),
  ...Object.values(sIcons),
].filter(
  item => item && typeof item === 'object' && 'iconName' in item && 'icon' in item
) as IconDefinition[];
console.log(filteredIcons);
export default filteredIcons;
