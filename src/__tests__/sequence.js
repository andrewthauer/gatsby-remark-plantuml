// See http://plantuml.com/sequence-diagram

const testRemarkPlugin = require(`../../test/test-remark-plugin`)
describe(`Sequence`, () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it(`Basic examples`, async () => {
    const code = `
\`\`\`plantuml
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: Another authentication Response
@enduml
\`\`\`
`

    await testRemarkPlugin.testPlugin({
      code,
    })
  })

  describe(`Declaring participant`, () => {
    it(`Example 1`, async () => {
      const code = `
\`\`\`plantuml
@startuml
actor Foo1
boundary Foo2
control Foo3
entity Foo4
database Foo5
collections Foo6
Foo1 -> Foo2 : To boundary
Foo1 -> Foo3 : To control
Foo1 -> Foo4 : To entity
Foo1 -> Foo5 : To database
Foo1 -> Foo6 : To collections

@enduml
\`\`\`
`
      await testRemarkPlugin.testPlugin({
        code,
      })
    })

    it(`Example 2`, async () => {
      const code = `
\`\`\`plantuml
@startuml
actor Bob #red
' The only difference between actor
'and participant is the drawing
participant Alice
participant "I have a really\\nlong name" as L #99FF99
/' You can also declare:
   participant L as "I have a really\\nlong name"  #99FF99
  '/

Alice->Bob: Authentication Request
Bob->Alice: Authentication Response
Bob->L: Log transaction
@enduml
\`\`\`
`
      await testRemarkPlugin.testPlugin({
        code,
      })
    })

    it(`Example 3`, async () => {
      const code = `
\`\`\`plantuml
@startuml
participant Last order 30
participant Middle order 20
participant First order 10
@enduml
\`\`\`
`
      await testRemarkPlugin.testPlugin({
        code,
      })
    })
  })

  it(`Use non-letters in participants`, async () => {
    const code = `
\`\`\`plantuml
@startuml
Alice -> "Bob()" : Hello
"Bob()" -> "This is very\\nlong" as Long
' You can also declare:
' "Bob()" -> Long as "This is very\\nlong"
Long --> "Bob()" : ok
@enduml
\`\`\`
`
    await testRemarkPlugin.testPlugin({
      code,
    })
  })

  it(`Message to Self`, async () => {
    const code = `
\`\`\`plantuml
@startuml
Alice->Alice: This is a signal to self.\\nIt also demonstrates\\nmultiline \\ntext
@enduml
\`\`\`
`
    await testRemarkPlugin.testPlugin({
      code,
    })
  })

  it(`Change arrow style`, async () => {
    const code = `
\`\`\`plantuml
@startuml
Bob ->x Alice
Bob -> Alice
Bob ->> Alice
Bob -\\ Alice
Bob \\\\- Alice
Bob //-- Alice

Bob ->o Alice
Bob o\\\\-- Alice

Bob <-> Alice
Bob <->o Alice
@enduml
\`\`\`
`
    await testRemarkPlugin.testPlugin({
      code,
    })
  })

  it(`Change arrow color`, async () => {
    const code = `
\`\`\`plantuml
@startuml
Bob -[#red]> Alice : hello
Alice -[#0000FF]->Bob : ok
@enduml
\`\`\`
`
    await testRemarkPlugin.testPlugin({
      code,
    })
  })

  describe(`Message sequence numbering`, () => {
    it(`Example 1`, async () => {
      const code = `
\`\`\`plantuml
@startuml
autonumber
Bob -> Alice : Authentication Request
Bob <- Alice : Authentication Response
@enduml
\`\`\`
`
      await testRemarkPlugin.testPlugin({
        code,
      })
    })

    it(`Example 2`, async () => {
      const code = `
\`\`\`plantuml
@startuml
autonumber
Bob -> Alice : Authentication Request
Bob <- Alice : Authentication Response

autonumber 15
Bob -> Alice : Another authentication Request
Bob <- Alice : Another authentication Response

autonumber 40 10
Bob -> Alice : Yet another authentication Request
Bob <- Alice : Yet another authentication Response

@enduml
\`\`\`
`
      await testRemarkPlugin.testPlugin({
        code,
      })
    })

    it(`Example 3`, async () => {
      const code = `
\`\`\`plantuml
@startuml
autonumber "<b>[000]"
Bob -> Alice : Authentication Request
Bob <- Alice : Authentication Response

autonumber 15 "<b>(<u>##</u>)"
Bob -> Alice : Another authentication Request
Bob <- Alice : Another authentication Response

autonumber 40 10 "<font color=red><b>Message 0  "
Bob -> Alice : Yet another authentication Request
Bob <- Alice : Yet another authentication Response

@enduml
\`\`\`
`
      await testRemarkPlugin.testPlugin({
        code,
      })
    })

    it(`Example 4`, async () => {
      const code = `
\`\`\`plantuml
@startuml
autonumber 10 10 "<b>[000]"
Bob -> Alice : Authentication Request
Bob <- Alice : Authentication Response

autonumber stop
Bob -> Alice : dummy

autonumber resume "<font color=red><b>Message 0  "
Bob -> Alice : Yet another authentication Request
Bob <- Alice : Yet another authentication Response

autonumber stop
Bob -> Alice : dummy

autonumber resume 1 "<font color=blue><b>Message 0  "
Bob -> Alice : Yet another authentication Request
Bob <- Alice : Yet another authentication Response
@enduml
\`\`\`
`
      await testRemarkPlugin.testPlugin({
        code,
      })
    })
  })

  it(`Page Title, Header and Footer`, async () => {
    const code = `
\`\`\`plantuml
@startuml

header Page Header
footer Page %page% of %lastpage%

title Example Title

Alice -> Bob : message 1
Alice -> Bob : message 2

@enduml
\`\`\`
`
    await testRemarkPlugin.testPlugin({
      code,
    })
  })

  it(`Splitting diagrams`, async () => {
    const code = `
\`\`\`plantuml
@startuml

Alice -> Bob : message 1
Alice -> Bob : message 2

newpage

Alice -> Bob : message 3
Alice -> Bob : message 4

newpage A title for the\\nlast page

Alice -> Bob : message 5
Alice -> Bob : message 6
@enduml
\`\`\`
`
    await testRemarkPlugin.testPlugin({
      code,
    })
  })
})
