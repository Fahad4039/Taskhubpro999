import TaskCard from '../TaskCard'

export default function TaskCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TaskCard
        title="Watch Product Review"
        description="Watch a 30-second product review video"
        earnings="0.50"
        duration="30 seconds"
        category="Video Ad"
        available={true}
        onWatch={() => console.log('Watching ad')}
      />
      <TaskCard
        title="Mobile App Advertisement"
        description="View a mobile app promotional ad"
        earnings="0.75"
        duration="45 seconds"
        category="App Ad"
        available={true}
        onWatch={() => console.log('Watching ad')}
      />
      <TaskCard
        title="Survey & Watch"
        description="Complete a quick survey and watch an ad"
        earnings="2.00"
        duration="2 minutes"
        category="Survey"
        available={false}
        onWatch={() => console.log('Watching ad')}
      />
    </div>
  )
}
