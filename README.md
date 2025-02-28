# Champion Hunter

![](https://img.shields.io/badge/SupportBy-LviatStudio-blue?style=flat)

Champion Hunter 是一款面向 Figma 生态的智能资产治理解决方案。旨在构建多维度信息萃取引擎与智能 Pipeline，
通过深度打通设计工具链路，实现工程资产数据的智能化解析与重组。  
最终赋能 UX 团队在跨平台交付场景中实现沉浸式采样体验与一键式可视化智控导出，优化整体工作流体验，完成从设计价值挖掘到工程效能转化的闭环。

v0.8.4  
by [LviatYi](mailto:LviatYi@foxmail.com)

阅读该文档时，推荐安装以下字体：

- [JetBrainsMono Nerd Font Mono][JetbrainsMonoNerdFont]
- [Sarasa Mono SC][SarasaMonoSC]

若出现乱码，其为 Nerd Font 的特殊字符，不影响段落语义。

## ChangeLog ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

### Unreleased

- [ ] **FEAT** 补全文档，添加教程信息。

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

它旨在提供如下便利：

- [x] **博采众长** 与 Figma API 深度合作，萃取所有潜在有效信息加以分析利用。
- [x] **管线数据** 管道化数据分析，直接构建 Excel 行。直接粘贴到目标文件。
- [x] **强取豪夺** 参考需求侧工作流，分析节点树，识别所有参选节点。
- [ ] **智能合并** 提供基于约定主键的数据合并。

[JetbrainsMonoNerdFont]:https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip@fallbackFont

[SarasaMonoSC]:https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
