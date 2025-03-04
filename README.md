# Champion Hunter

![](https://img.shields.io/badge/SupportBy-LviatStudio-blue?style=flat)

<div style="text-align: right; ">
    <img 
src="https://raw.githubusercontent.com/LviatYi/champion-hunter/refs/heads/main/pic/icon128x128.png" 
alt="champion-hunter Logo" 
width="200px"
align="right"
>
</div>

[Champion Hunter][path_to_repo] 是一款面向 Figma 生态的智能资产治理解决方案。旨在构建多维度信息萃取引擎与智能 Pipeline，
通过深度打通设计工具链路，实现工程资产数据的智能化解析与重组。  
最终赋能 UX 团队在跨平台交付场景中实现沉浸式采样体验与一键式可视化智控导出，优化整体工作流体验，完成从设计价值挖掘到工程效能转化的闭环。

v0.8.7  
by [LviatYi](mailto:LviatYi@foxmail.com)

阅读该文档时，推荐安装以下字体：

- [JetBrainsMono Nerd Font Mono][JetbrainsMonoNerdFont]
- [Sarasa Mono SC][SarasaMonoSC]

若出现乱码，其为 Nerd Font 的特殊字符，不影响段落语义。

## ChangeLog ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

[//]: # (### Unreleased)

### v0.8.7

- **FEAT** 补全文档，添加教程信息。

### v0.8.6

- **FEAT** 推断 Heavy 字体为粗体。

### v0.8.5

- **FEAT** 监听 Figma 事件，实现选区更新。
- **FEAT** 隐藏导出预览文本窗口。添加单项预览与调整窗口，支持同步改动。

### v0.8.4

- **FIX** 修复 Frame 未包含于 UsableNode，使用 UsableNode 替换 SceneNode。该错误曾导致 Frame 无导出。

### v0.8.3

- **PERF** 优化日志结构及表现。

### v0.8.2

- **FEAT** 导出 frame node。
- **FEAT** 根据首个 frame 计算绝对位置。
- **FEAT** 对导出 number 进行四舍五入。

### v0.8.1

- **FEAT** 发布首个版本，提供基础功能。

## Functional ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

![preview](https://raw.githubusercontent.com/LviatYi/champion-hunter/refs/heads/main/pic/champion-hunter-preview.png)

它旨在提供如下便利：

- [x] **博采众长** 与 Figma API 深度合作，萃取所有潜在有效信息加以分析利用。
- [x] **管线数据** 管道化数据分析，直接构建 Excel 行。直接粘贴到目标文件。
- [x] **强取豪夺** 参考需求侧工作流，分析节点树，识别所有参选节点。
- [x] **次生枝蔓** 单项预览与调整窗口，支持同步改动。

## Usage ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

### Installation

- _[⭐推荐]_ 方法一 从 Figma 插件商店下载安装
  ![install_from_ea_store](https://raw.githubusercontent.com/LviatYi/champion-hunter/refs/heads/main/pic/install_from_ea_store.png)
- 方法二 从 Github 下载 [最新版本][path_to_repo_release]。
    1. 解压下载的压缩包。
    2. ![import_from_manifest](https://raw.githubusercontent.com/LviatYi/champion-hunter/refs/heads/main/pic/import_from_manifest.png)
    3. 选择解压文件夹下的
       manifest.json，完成安装。![select_manifest](https://raw.githubusercontent.com/LviatYi/champion-hunter/refs/heads/main/pic/select_manifest.png)

---

### Hunt

选取要导出的节点，随后右键并运行 Champion-Hunter 插件。

![hunt01](https://raw.githubusercontent.com/LviatYi/champion-hunter/refs/heads/main/pic/hunt01.png)

- 支持导出的节点有：
    - ![node-group](https://raw.githubusercontent.com/LviatYi/champion-hunter/refs/heads/main/pic/node-group.png)
      **组合节点**
    - ![node-rectangle](https://raw.githubusercontent.com/LviatYi/champion-hunter/refs/heads/main/pic/node-rectangle.png)
      **图片节点**
    - ![node-text](https://raw.githubusercontent.com/LviatYi/champion-hunter/refs/heads/main/pic/node-text.png)
      **文本节点**
    - ![node-frame](https://raw.githubusercontent.com/LviatYi/champion-hunter/refs/heads/main/pic/node-frame.png)
      **框架节点**
    - ![node-instance](https://raw.githubusercontent.com/LviatYi/champion-hunter/refs/heads/main/pic/node-instance.png)
      **实例节点**
- 当选择 **组合节点** 时，其下所有 **可见** 的有效节点（组合节点、图片节点、文本节点、框架节点、实例节点）均会被导出。不可见节点将被忽略。
- 当手动选择节点时，即便 **不可见**，自身也将被导出。

---

### Export

![hunt02](https://raw.githubusercontent.com/LviatYi/champion-hunter/refs/heads/main/pic/hunt02.png)

导出之前：

- 你可以重选节点，Champion Hunter 窗口将即时刷新。
- 可以修改节点的 Name 或 Text 属性。修改将同步应用回 figma 工程。
    - 建议在该窗口中谨慎修改 Text 属性，可能有来自 Figma 自身限制导致的非预期的问题，如：当环境不存在字体时，Figma
      工程不允许修改文本内容。

导出可用：

- 点击 **Copy Selection to Clipboard**。这将导出 左侧 **预览界面** 代表的单行数据。
- 点击 **Copy All to Clipboard**。这将导出 右侧 **节点选择界面** 包含的所有已选有效节点。

你可以回到正在工作的 Excel（这个 Excel 应满足 Champion 的数据格式要求）。选择一个空行的最左侧（多选时，这个空行之下最好保留足够的空间），粘贴数据，即可完成导出。

---

### Configuration

遗憾的是，收到 Figma 插件环境限制，Champion Hunter 不能够读写一个配置文件。因此一些应该被配置的参数，只能通过代码来修改。

假如你非常急迫地需要配置修改立刻生效，你需要使用 Installation 章指明的 **方法二** 来安装插件。然后，你可以在解压根目录找到
`dist/code.js` 文件。  
打开它，随后你可以搜索感兴趣的参数并修改。

可以修改的配置项：

- **TopBar 高度** default `65`
    - 所有控件的 y 坐标将在导出时减去这个值。在 `code.js` 中搜索 `TOP_BAR_HEIGHT`
        - `TOP_BAR_HEIGHT=65` 修改此处的 65 为你想要的值。
- **粗体字辨识要素** default `["bold","heavy"]`
    - 判断 TextNode 是一个粗体文本的条件是：字体样式名包含 "bold" 或 "heavy"。在 `code.js` 中搜索
      `BOLD_FONT_STYLE_REFERENCE_IN_LOWER_CASE`
        - `BOLD_FONT_STYLE_REFERENCE_IN_LOWER_CASE=["bold","heavy"]` 添加可表示为粗体的要素（全小写），如改为：
          `BOLD_FONT_STYLE_REFERENCE_IN_LOWER_CASE=["bold","heavy","xxl"]`

---

### Best Practice

- **建议** Figma 工程内的节点名称应符合规范，它最好通过一定的规则来保证唯一性。
- **可以** 通过节点的可见性来控制导出的节点。
- 如果有任何可以改进工作流的地方，或者遇到了问题，**可以** 去 [这里][path_to_repo_issue] 点击 **New issue** 汇报。
- 如果认为 **Champion Hunter** 对你的工作有帮助，请给一个 [star][path_to_repo]。

---

[path_to_repo]:https://github.com/LviatYi/champion-hunter

[path_to_repo_release]:https://github.com/LviatYi/champion-hunter/releases

[path_to_repo_issue]: https://github.com/LviatYi/champion-hunter/issues

[JetbrainsMonoNerdFont]:https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip@fallbackFont

[SarasaMonoSC]:https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
