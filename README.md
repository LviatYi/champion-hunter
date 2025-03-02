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

v0.8.6  
by [LviatYi](mailto:LviatYi@foxmail.com)

阅读该文档时，推荐安装以下字体：

- [JetBrainsMono Nerd Font Mono][JetbrainsMonoNerdFont]
- [Sarasa Mono SC][SarasaMonoSC]

若出现乱码，其为 Nerd Font 的特殊字符，不影响段落语义。

## ChangeLog ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

### Unreleased

- [ ] **FEAT** 补全文档，添加教程信息。

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

- [推荐] 从 Figma 插件商店安装
  ![install_from_ea_store](https://raw.githubusercontent.com/LviatYi/champion-hunter/refs/heads/main/pic/install_from_ea_store.png)
- 从 Github 下载 [最新版本][path_to_repo_release]。
    1. 解压下载的压缩包。
    2. ![import_from_manifest](https://raw.githubusercontent.com/LviatYi/champion-hunter/refs/heads/main/pic/import_from_manifest.png)
    3. 选择解压文件夹下的
       manifest.json![select_manifest](https://raw.githubusercontent.com/LviatYi/champion-hunter/refs/heads/main/pic/select_manifest.png)

---

[path_to_repo]:https://github.com/LviatYi/champion-hunter

[path_to_repo_release]:https://github.com/LviatYi/champion-hunter/releases

[JetbrainsMonoNerdFont]:https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip@fallbackFont

[SarasaMonoSC]:https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
