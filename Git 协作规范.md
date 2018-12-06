### **Git 协作规范**



1. **分支说明**

**master 分支**

- 主分支，稳定分支，对应当前线上版本
- 以 tag 标记一个版本，因此在 master 分支上看到的每一个 tag 都应该对应一个线上版本
- 不允许在该分支直接提交代码

**develop 分支**

- 开发分支，稳定分支，包含了项目最新的功能和代码，所有开发都依赖 develop 分支进行
- develop 分支作为开发的主分支，不允许直接提交代码。新功能和改动切出相应的 feature 分支进行开发

**feature 分支**

- 功能分支，开发新功能的分支
- 开发新的功能或者改动调整，从 develop 分支切换出 feature 分支，分支名称为 `feature/xxx`
- 开发完成后合并回 develop 分支并且删除该 feature/xxx 分支
- 提测前bug在原来的feature/xxx 分支上修复后合并到develop

**release 分支**

- 发布分支，新功能合并到 develop 分支，准备发布新版本时使用的分支
- 当 develop 分支完成功能合并和部分 bug fix，准备发布新版本时，切出一个 release 分支，来做发布前的准备，分支名约定为`release/xxx`
- 发布之前发现的 bug 就直接在这个分支上修复，确定准备发版本就合并到 master 分支，完成发布，同时合并到 develop 分支

**hotfix 分支**

- 紧急修复线上 bug 分支

- 当线上版本出现 bug 时，从 master 分支切出一个 `hotfix/xxx` 分支，完成 bug 修复，然后将 `hotfix/xxx` 合并到 master 和 develop 分支(如果此时存在 release 分支，则应该合并到 release 分支)，合并完成后删除该 `hotfix/xxx` 分支



2. **同一分支 pull 操作规范**

   - 同一分支 pull 操作建议使用使用 rebase，使提交历史更加清晰

3. **分支合并规范**

   - 从其他分支例如 hotfix、release 分支合并到 master 分支必须通过 Merge Request
   - 每一次 MR 必须保证编译没有问题才能进行合并（后期采用 gitlab ci 进行自动化检查）
   - 分支合并时推荐使用 --no-ff，这有助于新功能的 code review，只需要检视切出 feature 的那条线上的提交即可。

4. **提交信息规范**

   **提交信息的原则**

   - 准确的提交描述，具备可检索性
   - 合理的提交范围，避免一个功能就一笔提交
   - 避免出现过多的分叉
   - 避免重复的提交信息

   **提交信息的格式**

   git commit 格式 如下：

   ```
   <type>(<scope>): <subject>
   ```

   各个部分的说明如下：

   - type 类型，提交的类别

     - **feat**: 新功能
     - **fix**: 修复 bug
     - **docs**: 文档变动
     - **style**: 格式调整，对代码实际运行没有改动，例如添加空行、格式化等
     - **perf**: 提升性能的改动
     - **test**: 添加或修正测试代码
     - **chore**: 构建过程或辅助工具和库（如文档生成）的更改

   - scope 修改范围

     主要是这次修改涉及到的部分，使用模块名作为scope，例如 login、train-order

   - subject 修改的描述

     具体的修改描述信息

   - 范例

     ```
     feat(detail): 详情页修改样式
     fix(login): 登录页面错误处理
     test(list): 列表页添加测试代码
     ```

